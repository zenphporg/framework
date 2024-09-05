<?php

namespace Zen\Zorah;

use Illuminate\Support\ServiceProvider;

class ZorahServiceProvider extends ServiceProvider
{
  /**
   * Boot up our service provider.
   *
   * @return void
   */
  public function boot()
  {
    if ($this->app->runningInConsole()) {
      $this->commands([
        CommandTranslationGenerator::class,
      ]);
    }
  }
}
