<?php

namespace Zen\Snowflake;

use Illuminate\Container\Container;
use Illuminate\Support\ServiceProvider;
use InvalidArgumentException;
use Zen\Application;
use Zen\Snowflake\Contracts\SequenceResolver;
use Zen\Snowflake\Contracts\SnowflakeDriver;
use Zen\Snowflake\Resolvers\RandomResolver;
use Zen\Snowflake\Resolvers\RedisResolver;
use Zen\Snowflake\Resolvers\SwooleResolver;
use Zen\Snowflake\Resolvers\ZenResolver;

class SnowflakeServiceProvider extends ServiceProvider
{
  /**
   * Register any package services.
   *
   * @return void
   */
  public function register(): void
  {
    $this->mergeConfigFrom(dirname(__DIR__, 2).'/config/snowflake.php', 'snowflake');
  }

  /**
   * Boot any package services.
   *
   * @return void
   */
  public function boot(): void
  {
    $this->publishes([
      dirname(__DIR__, 2).'/config/snowflake.php' => config_path('snowflake.php'),
    ]);

    $this->registerProviders();
  }

  /**
   * Bind the service to the container.
   *
   * @return void
   */
  public function registerProviders(): void
  {
    $this->app->singleton(SequenceResolver::class, function (Application $app) {
      $config = $app['config']->get('snowflake');

      return $this->resolveInstance($config);
    });

    $this->app->singleton(SnowflakeDriver::class, function (Application $app) {
      $config = $app['config']->get('snowflake');

      return $this->resolveDriver($config)
        ->setStartTimeStamp($config['start'])
        ->setSequenceResolver($app->make(SequenceResolver::class));
    });
  }

  /**
   * Resolve the requested SequenceResolver class.
   *
   * @param  array  $config
   * @return \Zen\Snowflake\Contracts\SequenceResolver
   */
  private function resolveInstance(array $config): SequenceResolver
  {
    return match ($config['resolver']) {
      'random' => new RandomResolver(time()),
      'redis' => new RedisResolver(Container::getInstance()['redis']->connection($config['redis.connection'])),
      'swoole' => new SwooleResolver(time()),
      'zen' => new ZenResolver(Container::getInstance()['cache']->store()),
      default => throw new InvalidArgumentException("Unsupported resolver: {$config['resolver']}"),
    };
  }

  /**
   * Resolve and build the requested Driver.
   *
   * @param  array  $config
   * @return \Zen\Snowflake\Contracts\SnowflakeDriver
   */
  private function resolveDriver(array $config): SnowflakeDriver
  {
    return match ($config['instance']) {
      'snowflake' => new Snowflake($config['datacenter'], $config['worker']),
      'sonyflake' => new Sonyflake($config['machine']),
      default => throw new InvalidArgumentException("Unsupported driver: {$config['instance']}"),
    };
  }
}
