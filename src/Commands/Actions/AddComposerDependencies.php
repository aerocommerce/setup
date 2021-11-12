<?php

namespace Aero\Setup\Commands\Actions;

class AddComposerDependencies
{
    protected $dependencies = [
        'aerocommerce/admin' => '^1',
        'aerocommerce/checkout' => '^0',
        'aerocommerce/core' => '^0',
        'aerocommerce/elastic-search' => '^1',
    ];

    protected $devDependencies = [
        //'aerocommerce/dev' => '^0',
    ];

    protected $repositories = [
        [
            'type' => 'path',
            'url' => '/Users/tim/code/aero/core',
        ],
        [
            'type' => 'path',
            'url' => '/Users/tim/code/aero/admin',
        ],
        [
            'type' => 'composer',
            'url' => 'https://agora.aerocommerce.com',
        ],
    ];

    protected $scripts = [];

    protected $options;

    public function handle($options)
    {
        $this->options = $options;

        $composer = $this->getComposerConfiguration();

        $composer = $this->addRepositories(
            $this->addDependencies(
                $this->addDevDependencies($composer)
            )
        );

        $composer = $this->addScripts($composer);

        $this->writeComposerFile($composer);
    }

    protected function getComposerConfiguration(): array
    {
        return json_decode(file_get_contents(
            base_path('composer.json')
        ), true);
    }

    protected function addDependencies(array $composer): array
    {
        foreach ($this->dependencies as $dependency => $version) {
            $composer['require'][$dependency] = $version;
        }

        return $composer;
    }

    protected function addDevDependencies(array $composer): array
    {
        foreach ($this->devDependencies as $dependency => $version) {
            $composer['require-dev'][$dependency] = $version;
        }

        return $composer;
    }

    protected function addRepositories(array $composer): array
    {
        if (! isset($composer['repositories'])) {
            $composer['repositories'] = [];
        }

        foreach ($this->repositories as $repository) {
            $composer['repositories'][] = $repository;
        }

        return $composer;
    }

    protected function addScripts(array $composer): array
    {
        if (! isset($composer['scripts'])) {
            $composer['scripts'] = [];
        }

        foreach ($this->scripts as $area => $scripts) {
            if (! isset($composer['scripts'][$area])) {
                $composer['scripts'][$area] = [];
            }

            foreach ($scripts as $script) {
                $composer['scripts'][$area][] = $script;
            }
        }

        return $composer;
    }

    protected function writeComposerFile(array $composer): void
    {
        file_put_contents(
            base_path('composer.json'),
            json_encode($composer, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)
        );
    }
}
