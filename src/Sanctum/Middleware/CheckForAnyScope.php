<?php

namespace Zen\Sanctum\Middleware;

use Zen\Sanctum\Exceptions\MissingScopeException;

/**
 * @deprecated
 * @see \Zen\Sanctum\Middleware\CheckForAnyAbility
 */
class CheckForAnyScope
{
  /**
   * Handle the incoming request.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \Closure  $next
   * @param  mixed  ...$scopes
   * @return \Illuminate\Http\Response
   *
   * @throws \Illuminate\Auth\AuthenticationException|\Zen\Sanctum\Exceptions\MissingScopeException
   */
  public function handle($request, $next, ...$scopes)
  {
    try {
      return (new CheckForAnyAbility)->handle($request, $next, ...$scopes);
    } catch (\Zen\Sanctum\Exceptions\MissingAbilityException $e) {
      throw new MissingScopeException($e->abilities());
    }
  }
}
