<?php

namespace Zen\Ziggy\Output;

use Stringable;
use Zen\Ziggy\Ziggy;

class File implements Stringable
{
  public function __construct(
    protected Ziggy $ziggy,
  ) {}

  public function __toString(): string
  {
    return <<<JAVASCRIPT
        const Ziggy = {$this->ziggy->toJson()};
        if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
          Object.assign(Ziggy.routes, window.Ziggy.routes);
        }
        export { Ziggy };

        JAVASCRIPT;
  }
}
