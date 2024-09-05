<?php

namespace Zen\Modulr\Console\Commands\Database;

use Illuminate\Support\Str;
use Zen\Modulr\Concerns\GeneratesModules;

class SeedCommand extends \Illuminate\Database\Console\Seeds\SeedCommand
{
  use GeneratesModules;

  protected function getSeeder()
  {
    if ($module = $this->module()) {
      $default = $this->getDefinition()->getOption('class')->getDefault();
      $class = $this->input->getOption('class');

      if ($class === $default) {
        $class = $module->qualify($default);
      } elseif (! Str::contains($class, 'Database\\Seeders')) {
        $class = $module->qualify("Database\\Seeders\\{$class}");
      }

      return $this->laravel->make($class)
        ->setContainer($this->laravel)
        ->setCommand($this);
    }

    return parent::getSeeder();
  }
}
