<?php

namespace Zen\Snowflake\Contracts;

interface SnowflakeDriver
{
  /**
   * Get snowflake id.
   *
   * @return string
   */
  public function id(): string;

  /**
   * Parse snowflake id.
   *
   * @param  string  $id
   * @param  bool  $transform
   * @return array
   */
  public function parseId(string $id, bool $transform = false): array;

  /**
   * Set start time (millisecond).
   *
   * @param  int  $startTime
   * @return self
   */
  public function setStartTimeStamp(int $startTime): self;

  /**
   * Set Sequence Resolver.
   *
   * @param  \Zen\Snowflake\Contracts\SequenceResolver  $sequence
   * @return self
   */
  public function setSequenceResolver(SequenceResolver $sequence): self;
}
