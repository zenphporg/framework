<?php

return [

  /**
   * SNOWFLAKE INSTANCE
   *
   * This option controls which Snowflake algorithm implementation to use.
   * You can choose between 'snowflake' (Twitter's original algorithm)
   * and 'sonyflake' (Sony's variation).
   *
   * Supported: "snowflake", "sonyflake"
   */
  'instance' => env('SNOWFLAKE_INSTANCE', 'snowflake'),

  /**
   * DATACENTER ID
   *
   * The datacenter ID is used in the Snowflake algorithm to ensure uniqueness
   * across multiple datacenters. This should be an integer value.
   */
  'datacenter' => env('SNOWFLAKE_DATACENTER', 0),

  /**
   * WORKER ID
   *
   * The worker ID is used in the Snowflake algorithm to ensure uniqueness
   * across multiple workers within a datacenter. This should be an integer value.
   */
  'worker' => env('SNOWFLAKE_WORKER', 0),

  /**
   * MACHINE ID
   *
   * The machine ID is used in the Sonyflake algorithm. It should be an integer
   * between 0 and 65535 (2^16 - 1).
   */
  'machine' => env('SNOWFLAKE_MACHINE', 0),

  /**
   * SEQUENCE RESOLVER
   *
   * The sequence resolver is responsible for generating the sequence part of
   * the Snowflake ID. You can choose between different implementations based
   * on your requirements.
   *
   * Supported: "zen", "redis", "swoole", "random"
   */
  'resolver' => env('SNOWFLAKE_RESOLVER', 'zen'),

  /**
   * REDIS CONFIGURATION
   *
   * If you're using the Redis resolver, you can specify which Redis connection
   * to use. This should correspond to a connection defined in your Redis
   * configuration.
   */
  'redis' => [
    'connection' => env('SNOWFLAKE_REDIS_CONNECTION', 'default'),
  ],

  /**
   * START TIMESTAMP
   *
   * This is the epoch start time for your Snowflake IDs. The default is set
   * to the current time in milliseconds, but you can set this to any valid
   * timestamp (in milliseconds) to suit your application's needs.
   */
  'start' => env('SNOWFLAKE_START', time() * 1000),
];
