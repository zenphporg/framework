<?php

namespace Zen\Sanctum\Middleware;

use Illuminate\Auth\AuthenticationException;
use Zen\Sanctum\Exceptions\MissingAbilityException;

class CheckAbilities
{
  /**
   * Handle the incoming request.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \Closure  $next
   * @param  mixed  ...$abilities
   * @return \Illuminate\Http\Response
   *
   * @throws \Illuminate\Auth\AuthenticationException|\Zen\Sanctum\Exceptions\MissingAbilityException
   */
  public function handle($request, $next, ...$abilities)
  {
    if (! $request->user() || ! $request->user()->currentAccessToken()) {
      throw new AuthenticationException;
    }

    foreach ($abilities as $ability) {
      if (! $request->user()->tokenCan($ability)) {
        throw new MissingAbilityException($ability);
      }
    }

    return $next($request);
  }
}
