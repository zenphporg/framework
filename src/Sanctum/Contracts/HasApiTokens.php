<?php

namespace Zen\Sanctum\Contracts;

use DateTimeInterface;

interface HasApiTokens
{
  /**
   * Get the access tokens that belong to model.
   *
   * @return \Illuminate\Database\Eloquent\Relations\MorphMany
   */
  public function tokens();

  /**
   * Determine if the current API token has a given scope.
   *
   * @return bool
   */
  public function tokenCan(string $ability);

  /**
   * Create a new personal access token for the user.
   *
   * @return \Zen\Sanctum\NewAccessToken
   */
  public function createToken(string $name, array $abilities = ['*'], ?DateTimeInterface $expiresAt = null);

  /**
   * Get the access token currently associated with the user.
   *
   * @return \Zen\Sanctum\Contracts\HasAbilities
   */
  public function currentAccessToken();

  /**
   * Set the current access token for the user.
   *
   * @param  \Zen\Sanctum\Contracts\HasAbilities  $accessToken
   * @return \Zen\Sanctum\Contracts\HasApiTokens
   */
  public function withAccessToken($accessToken);
}
