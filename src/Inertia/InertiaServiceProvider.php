<?php

namespace Zen\Inertia;

use Illuminate\Http\Request;
use Illuminate\Routing\Router;
use Illuminate\Support\ServiceProvider;
use Illuminate\Testing\TestResponse;
use Illuminate\View\FileViewFinder;
use LogicException;
use ReflectionException;
use Zen\Inertia\Ssr\Gateway;
use Zen\Inertia\Ssr\HttpGateway;
use Zen\Inertia\Support\Header;
use Zen\Inertia\Testing\TestResponseMacros;

class InertiaServiceProvider extends ServiceProvider
{
  public function register(): void
  {
    $this->app->singleton(ResponseFactory::class);
    $this->app->bind(Gateway::class, HttpGateway::class);

    $this->mergeConfigFrom(dirname(__DIR__, 2).'/config/inertia.php', 'inertia');

    $this->registerBladeDirectives();
    $this->registerRequestMacro();
    $this->registerRouterMacro();
    $this->registerTestingMacros();

    $this->app->bind('inertia.testing.view-finder', function ($app) {
      return new FileViewFinder(
        $app['files'],
        $app['config']->get('inertia.testing.page_paths'),
        $app['config']->get('inertia.testing.page_extensions')
      );
    });
  }

  public function boot(): void
  {
    $this->registerConsoleCommands();

    $this->publishes([dirname(__DIR__, 2).'/config/inertia.php' => config_path('inertia.php')]);
  }

  protected function registerBladeDirectives(): void
  {
    $this->callAfterResolving('blade.compiler', function ($blade) {
      $blade->directive('inertia', [Directive::class, 'compile']);
      $blade->directive('inertiaHead', [Directive::class, 'compileHead']);
    });
  }

  protected function registerConsoleCommands(): void
  {
    if (! $this->app->runningInConsole()) {
      return;
    }

    $this->commands([
      Commands\CreateMiddleware::class,
      Commands\StartSsr::class,
      Commands\StopSsr::class,
    ]);
  }

  protected function registerRequestMacro(): void
  {
    Request::macro('inertia', function () {
      return (bool) $this->header(Header::INERTIA);
    });
  }

  protected function registerRouterMacro(): void
  {
    Router::macro('inertia', function ($uri, $component, $props = []) {
      return $this->match(['GET', 'HEAD'], $uri, '\\'.Controller::class)
        ->defaults('component', $component)
        ->defaults('props', $props);
    });
  }

  /**
   * @throws ReflectionException|LogicException
   */
  protected function registerTestingMacros(): void
  {
    if (class_exists(TestResponse::class)) {
      TestResponse::mixin(new TestResponseMacros);

      return;
    }

    throw new LogicException('Could not detect TestResponse class.');
  }
}
