<?php

namespace Zen\Sanctum;

use DateTimeInterface;
use Illuminate\Support\Str;

trait HasApiTokens
{
  /**
   * The access token the user is using for the current request.
   *
   * @var \Zen\Sanctum\Contracts\HasAbilities
   */
  protected $accessToken;

  /**
   * Get the access tokens that belong to model.
   *
   * @return \Illuminate\Database\Eloquent\Relations\MorphMany
   */
  public function tokens()
  {
    return $this->morphMany(Sanctum::$personalAccessTokenModel, 'tokenable');
  }

  /**
   * Determine if the current API token has a given scope.
   *
   * @return bool
   */
  public function tokenCan(string $ability)
  {
    return $this->accessToken && $this->accessToken->can($ability);
  }

  /**
   * Create a new personal access token for the user.
   *
   * @return \Zen\Sanctum\NewAccessToken
   */
  public function createToken(string $name, array $abilities = ['*'], ?DateTimeInterface $expiresAt = null)
  {
    $plainTextToken = $this->generateTokenString();

    $token = $this->tokens()->create([
      'name' => $name,
      'token' => hash('sha256', $plainTextToken),
      'abilities' => $abilities,
      'expires_at' => $expiresAt,
    ]);

    return new NewAccessToken($token, $token->getKey().'|'.$plainTextToken);
  }

  /**
   * Generate the token string.
   *
   * @return string
   */
  public function generateTokenString()
  {
    return sprintf(
      '%s%s%s',
      config('sanctum.token_prefix', ''),
      $tokenEntropy = Str::random(40),
      hash('crc32b', $tokenEntropy)
    );
  }

  /**
   * Get the access token currently associated with the user.
   *
   * @return \Zen\Sanctum\Contracts\HasAbilities
   */
  public function currentAccessToken()
  {
    return $this->accessToken;
  }

  /**
   * Set the current access token for the user.
   *
   * @param  \Zen\Sanctum\Contracts\HasAbilities  $accessToken
   * @return $this
   */
  public function withAccessToken($accessToken)
  {
    $this->accessToken = $accessToken;

    return $this;
  }
}
