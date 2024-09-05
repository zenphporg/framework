<?php

namespace Zen\Snowflake\Resolvers;

use Redis;
use RedisException;
use Zen\Snowflake\Contracts\SequenceResolver;

class RedisResolver implements SequenceResolver
{
  /**
   * The Redis client instance.
   *
   * @var Redis
   */
  protected Redis $redis;

  /**
   * The cache prefix for Redis keys.
   *
   * @var string
   */
  protected string $prefix = '';

  /**
   * Initialize the resolver instance with a Redis connection.
   *
   * @param  Redis  $redis  The Redis client instance
   *
   * @throws RedisException If the Redis server is not reachable
   */
  public function __construct(Redis $redis)
  {
    if ($redis->ping()) {
      $this->redis = $redis;

      return;
    }

    throw new RedisException('Redis server went away');
  }

  /**
   * Generate the next sequence number for the given timestamp.
   *
   * @param  int  $currentTime  The current timestamp
   * @return int The generated sequence number
   *
   * @throws RedisException If there's an error communicating with Redis
   */
  public function sequence(int $currentTime): int
  {
    $lua = "return redis.call('exists',KEYS[1])<1 and redis.call('psetex',KEYS[1],ARGV[2],ARGV[1])";

    $key = $this->prefix.$currentTime;

    if ($this->redis->eval($lua, [$key, 1, 1000], 1)) {
      return 0;
    }

    return $this->redis->incrby($key, 1);
  }

  /**
   * Set the cache prefix for Redis keys.
   *
   * @param  string  $prefix  The prefix to use for Redis keys
   * @return self
   */
  public function setCachePrefix(string $prefix): self
  {
    $this->prefix = $prefix;

    return $this;
  }
}
