<?php

namespace Zen\Inertia\Ssr;

class BundleDetector
{
  public function detect()
  {
    return collect([
      config('inertia.ssr.bundle'),
      base_path('.zen/ssr/ssr.mjs'),
      base_path('.zen/ssr/ssr.js'),
      public_path('js/ssr.js'),
    ])->filter()->first(function ($path) {
      return file_exists($path);
    });
  }
}
