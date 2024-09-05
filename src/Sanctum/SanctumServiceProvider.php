<?php

namespace Zen\Sanctum;

use Illuminate\Auth\RequestGuard;
use Illuminate\Contracts\Http\Kernel;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Zen\Sanctum\Console\Commands\PruneExpired;
use Zen\Sanctum\Controllers\CsrfCookieController;
use Zen\Sanctum\Middleware\EnsureFrontendRequestsAreStateful;

class SanctumServiceProvider extends ServiceProvider
{
  /**
   * Register any application services.
   *
   * @return void
   */
  public function register()
  {
    config([
      'auth.guards.sanctum' => array_merge([
        'driver' => 'sanctum',
        'provider' => null,
      ], config('auth.guards.sanctum', [])),
    ]);

    if (! app()->configurationIsCached()) {
      $this->mergeConfigFrom(dirname(__DIR__, 2).'/config/sanctum.php', 'sanctum');
    }
  }

  /**
   * Bootstrap any application services.
   *
   * @return void
   */
  public function boot()
  {
    if (app()->runningInConsole()) {
      $this->publishesMigrations([
        dirname(__DIR__, 2).'/database/migrations' => database_path('migrations'),
      ], 'sanctum-migrations');

      $this->publishes([
        dirname(__DIR__, 2).'/config/sanctum.php' => config_path('sanctum.php'),
      ], 'sanctum-config');

      $this->commands([
        PruneExpired::class,
      ]);
    }

    $this->defineRoutes();
    $this->configureGuard();
    $this->configureMiddleware();
  }

  /**
   * Define the Sanctum routes.
   *
   * @return void
   */
  protected function defineRoutes()
  {
    if (app()->routesAreCached() || config('sanctum.routes') === false) {
      return;
    }

    Route::group(['prefix' => config('sanctum.prefix', 'sanctum')], function () {
      Route::get(
        '/csrf-cookie',
        CsrfCookieController::class.'@show'
      )->middleware('web')->name('sanctum.csrf-cookie');
    });
  }

  /**
   * Configure the Sanctum authentication guard.
   *
   * @return void
   */
  protected function configureGuard()
  {
    Auth::resolved(function ($auth) {
      $auth->extend('sanctum', function ($app, $name, array $config) use ($auth) {
        return tap($this->createGuard($auth, $config), function ($guard) {
          app()->refresh('request', $guard, 'setRequest');
        });
      });
    });
  }

  /**
   * Register the guard.
   *
   * @param  \Illuminate\Contracts\Auth\Factory  $auth
   * @param  array  $config
   * @return RequestGuard
   */
  protected function createGuard($auth, $config)
  {
    return new RequestGuard(
      new Guard($auth, config('sanctum.expiration'), $config['provider']),
      request(),
      $auth->createUserProvider($config['provider'] ?? null)
    );
  }

  /**
   * Configure the Sanctum middleware and priority.
   *
   * @return void
   */
  protected function configureMiddleware()
  {
    $kernel = app()->make(Kernel::class);

    $kernel->prependToMiddlewarePriority(EnsureFrontendRequestsAreStateful::class);
  }
}
