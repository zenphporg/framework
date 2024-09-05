<?php

namespace Zen;

use Illuminate\Contracts\Foundation\Application as ApplicationContract;
use Illuminate\Events\EventServiceProvider;
use Illuminate\Foundation\Application as LaravelApplication;
use Illuminate\Log\Context\ContextServiceProvider;
use Illuminate\Log\LogServiceProvider;
use Illuminate\Routing\RoutingServiceProvider;
use Zen\Inertia\InertiaServiceProvider;
use Zen\Modulr\ModulrServiceProvider;
use Zen\Snowflake\SnowflakeServiceProvider;
use Zen\Ziggy\ZiggyServiceProvider;
use Zen\Zorah\ZorahServiceProvider;

class Application extends LaravelApplication implements ApplicationContract
{
  /**
   * Zen application version.
   *
   * @var string
   */
  const VERSION = '0.0.1';

  /**
   * The module path defined by the developer.
   *
   * @var string
   */
  protected $modulePath;

  /**
   * Create a new Illuminate application instance.
   *
   * @param  string|null  $basePath
   * @return void
   */
  public function __construct($basePath = null)
  {
    if ($basePath) {
      $this->setBasePath($basePath);
    }

    $this->registerBaseBindings();
    $this->registerBaseServiceProviders();
    $this->registerCoreContainerAliases();
  }

  /**
   * Get the version number of the application.
   *
   * @return string
   */
  public function version()
  {
    return static::VERSION;
  }

  /**
   * Register all of the base service providers.
   *
   * @return void
   */
  protected function registerBaseServiceProviders()
  {
    $this->register(new EventServiceProvider($this));
    $this->register(new LogServiceProvider($this));
    $this->register(new ContextServiceProvider($this));
    $this->register(new RoutingServiceProvider($this));
    $this->register(new SnowflakeServiceProvider($this));
    $this->register(new InertiaServiceProvider($this));
    $this->register(new ModulrServiceProvider($this));
    $this->register(new ZiggyServiceProvider($this));
    $this->register(new ZorahServiceProvider($this));
  }

  /**
   * Set the base path for the application.
   *
   * @param  string  $basePath
   * @return $this
   */
  public function setBasePath($basePath)
  {
    $this->basePath = rtrim($basePath, '\/');

    $this->bindPathsInContainer();

    return $this;
  }

  /**
   * Bind all of the application paths in the container.
   *
   * @return void
   */
  protected function bindPathsInContainer()
  {
    $this->instance('path', $this->path());
    $this->instance('path.base', $this->basePath());
    $this->instance('path.module', $this->modulePath());
    $this->instance('path.config', $this->configPath());
    $this->instance('path.database', $this->databasePath());
    $this->instance('path.public', $this->publicPath());
    $this->instance('path.resources', $this->resourcePath());
    $this->instance('path.storage', $this->storagePath());

    $this->useBootstrapPath(value(function () {
      return is_dir($directory = $this->basePath('.zen'))
        ? $directory
        : $this->basePath('bootstrap');
    }));

    $this->useLangPath(value(function () {
      return is_dir($directory = $this->resourcePath('lang'))
        ? $directory
        : $this->basePath('lang');
    }));
  }

  /**
   * Get the path to the application "app" directory.
   *
   * @param  string  $path
   * @return string
   */
  public function path($path = '')
  {
    return $this->joinPaths($this->appPath ?: $this->basePath('modules/app/src'), $path);
  }

  /**
   * Get the path to the application modules.
   *
   * @param  string  $path
   * @return string
   */
  public function modulePath($path = '')
  {
    return $this->joinPaths($this->modulePath ?: $this->basePath('modules'), $path);
  }

  /**
   * Get the path to the application configuration files.
   *
   * @param  string  $path
   * @return string
   */
  public function configPath($path = '')
  {
    return $this->joinPaths($this->configPath ?: $this->basePath('support/config'), $path);
  }

  /**
   * Get the path to the database directory.
   *
   * @param  string  $path
   * @return string
   */
  public function databasePath($path = '')
  {
    return $this->joinPaths($this->databasePath ?: $this->basePath('support/database'), $path);
  }

  /**
   * Get the path to the resources directory.
   *
   * @param  string  $path
   * @return string
   */
  public function resourcePath($path = '')
  {
    return $this->joinPaths($this->basePath('assets'), $path);
  }
}
