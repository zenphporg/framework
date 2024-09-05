<?php

namespace Zen\Snowflake\Resolvers;

use Exception;
use Swoole\Lock;
use Zen\Snowflake\Contracts\SequenceResolver;

class SwooleResolver implements SequenceResolver
{
  /**
   * The last timestamp processed.
   *
   * @var int
   */
  protected int $lastTimeStamp = -1;

  /**
   * The current sequence number.
   *
   * @var int
   */
  protected int $sequence = 0;

  /**
   * The Swoole lock instance.
   *
   * @var Lock
   */
  protected Lock $lock;

  /**
   * The number of lock acquisition attempts.
   *
   * @var int
   */
  protected int $count = 0;

  /**
   * Initialize the Swoole lock.
   *
   * @throws Exception If Swoole extension is not loaded
   */
  public function __construct()
  {
    if (! extension_loaded('swoole')) {
      throw new Exception('Swoole extension is not loaded');
    }
    $this->lock = new Lock(SWOOLE_MUTEX);
  }

  /**
   * Generate the next sequence number for the given timestamp.
   *
   * @param  int  $currentTime  The current timestamp
   * @return int The generated sequence number
   *
   * @throws Exception If unable to acquire the lock after multiple attempts
   */
  public function sequence(int $currentTime): int
  {
    if (! $this->lock->trylock()) {
      if ($this->count >= 10) {
        throw new Exception('Swoole lock failure. Unable to acquire the lock after multiple attempts.');
      }

      $this->count++;

      return 999999;  // This will cause the program to retry in the next millisecond
    }

    try {
      if ($this->lastTimeStamp === $currentTime) {
        $this->sequence++;
      } else {
        $this->sequence = 0;
      }

      $this->lastTimeStamp = $currentTime;

      return $this->sequence;
    } finally {
      $this->lock->unlock();
    }
  }
}
