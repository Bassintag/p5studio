# P5 Studio

![Screenshot](https://raw.githubusercontent.com/Bassintag/p5studio/master/screenshots/sketch.png)

## Table of matters

- [Getting Started](#getting-started)
- [CLI](#cli)
- [Writing sketches](#writing-sketches)
- [Examples](#examples)

## Getting started

### Installation

Before starting make sure you have [Python 3](https://www.python.org/downloads/) installed on your computer and that the `python` command is available in the path.

P5 Studio is available as a CLI, it is recommended to install it globally.

```bash
npm i -g p5-studio
```

### Creating a new workspace

You can easily create a new workspace using the CLI.

```bash
p5 create MyNewWorkspace
```

### Starting the web interface

Once you have successfully created a new project you can now use the serve command to start the development server.

This can be done by running the `serve` script that has been automatically added to the `package.json` file.

```bash
# with yarn
yarn serve

# with npm
npm run serve
```

By default the server will start on port `3000` and can be accessed by opening http://localhost:3000 in the browser

## CLI

Usage: `p5 [options] [command]`

### Commands

#### new [options] \<name>

Creates a new workspace with the provided name

| Option    | Description                  | Default |
|-----------|------------------------------|---------|
| -o, --out | Path of the output directory | .       |

#### generate [options] \<name> / g [options] \<name>

Generate a new sketch with the provided name

| Option    | Description                  | Default |
|-----------|------------------------------|---------|
| -o, --out | Path of the output directory | .       |

#### serve [options]

| Option            | Description                                   | Default   |
|-------------------|-----------------------------------------------|-----------|
| -p, --port        | Port to start the server on                   | 3000      |
| -d, --sketchesDir | Directory that contains the sketches          | .         |
| -o, --outDir      | Directory that contains the rendered sketches | ./renders |


## Writing sketches

Sketches must be written in [Typescript](https://www.typescriptlang.org/), they are compiled to Javascript automatically using esbuild.

All sketches within the specified sketch directory will be available through the web interface.

__In order for a sketch to be recognized, the file name must end by `.sketch.ts`.__

It is recommended to use the `generate` command to create new sketches in order to avoid mistakes.

The `optimization` field in the sketch metadata can be used to specify optimizations that will be applied when a render is saved.
This uses [vpype](https://vpype.readthedocs.io/en/latest/reference.html) in the background.
Please see this [example](https://github.com/Bassintag/p5studio/blob/master/examples/advanced-optimizations.sketch.ts) to learn how to configure the different optimizations.

The `gCode` metadata field can be used to generate a `.gcode` file alongside the `.svg`.
This uses [vpype-gcode](https://pypi.org/project/vpype-gcode/) in the background.
Please see the [gcode example](https://github.com/Bassintag/p5studio/blob/master/examples/gcode.sketch.ts) for more informations.

## Examples

For more examples please check out the [example folder](https://github.com/Bassintag/p5studio/tree/master/examples).

You can run the examples locally by cloning this repository and using the following command:

`npm run serve:examples`

### Example sketch

```typescript
import { SketchFn, SketchMetadata } from "p5-studio";

// This is your sketch metadata, everything is optionnal
// name: The name of your sketch
// resolution: The width and height of your sketch
// fps: The number of time your sketch is rendered every second (rendered only once if not specified)
export const metadata: SketchMetadata = {
  name: "Example sketch",
  resolution: {
    w: 500,
    h: 500,
  },
  optimizations: ['lineSimplify', 'lineMerge', 'reLoop', 'lineSort'],
};

// This function is called once every time the sketch is loaded.
// You can initialize variable and settings here.
// The parameter p is the p5 instance.
export const setup: SketchFn = (p) => {
};

// This function is called once every frame.
// Do your drawing here
// The parameter p is the p5 instance.
export const draw: SketchFn = (p) => {
  p.noFill();
  p.strokeWeight(5);
  p.stroke("red");
  p.circle(250, 250, 300);
};

```
