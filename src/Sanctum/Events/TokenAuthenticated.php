<?php

namespace Zen\Sanctum\Events;

class TokenAuthenticated
{
  /**
   * The personal access token that was authenticated.
   *
   * @var \Zen\Sanctum\PersonalAccessToken
   */
  public $token;

  /**
   * Create a new event instance.
   *
   * @param  \Zen\Sanctum\PersonalAccessToken  $token
   * @return void
   */
  public function __construct($token)
  {
    $this->token = $token;
  }
}
