<?php

if (! function_exists('get_inertia_page_paths')) {
  /**
   * This detects module view directories for the
   * view.php config file.
   */
  function get_inertia_page_paths(): array
  {
    $directories = glob(app()->modulePath().'/*', GLOB_ONLYDIR);

    return array_filter(array_map(function ($dir) {
      $pagePath = $dir.'/assets/pages';

      return is_dir($pagePath) ? $pagePath : null;
    }, $directories));
  }
}

if (! function_exists('get_module_view_paths')) {
  /**
   * Get the paths for all module view files.
   *
   * @return array
   */
  function get_module_view_paths(): array
  {
    $directories = glob(app()->modulePath().'/*', GLOB_ONLYDIR);

    return array_filter(array_map(function ($dir) {
      $viewPath = $dir.'/views';

      return is_dir($viewPath) ? $viewPath : null;
    }, $directories));
  }
}

if (! function_exists('inertia')) {
  /**
   * Inertia helper.
   *
   * @param  null|string  $component
   * @param  array|\Zen\Contracts\Support\Arrayable  $props
   * @return \Zen\Inertia\ResponseFactory|\Zen\Inertia\Response
   */
  function inertia($component = null, $props = [])
  {
    $instance = \Zen\Inertia\Inertia::getFacadeRoot();

    if ($component) {
      return $instance->render($component, $props);
    }

    return $instance;
  }
}

if (! function_exists('inertia_location')) {
  /**
   * Inertia location helper.
   *
   * @param  string  url
   * @return \Symfony\Component\HttpFoundation\Response
   */
  function inertia_location($url)
  {
    $instance = \Zen\Inertia\Inertia::getFacadeRoot();

    return $instance->location($url);
  }
}
