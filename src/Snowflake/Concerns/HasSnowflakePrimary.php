<?php

namespace Zen\Snowflake\Concerns;

use Illuminate\Database\Eloquent\Model;
use Zen\Snowflake\Contracts\SnowflakeDriver;

trait HasSnowflakePrimary
{
  public static function bootHasSnowflakePrimary()
  {
    static::saving(function (Model $model) {
      if (is_null($model->getKey())) {
        $model->setIncrementing(false);

        $model->setAttribute(
          $model->getKeyName(),
          app(SnowflakeDriver::class)->id()
        );
      }
    });
  }
}
