# Advent of code 2024 solutions

@denoland are offering up stickers for people who solve the Advent of Code for this year in Deno, and I'm not one to turn down a challenge.

## Setting up stuff

This is mostly for me when I solve the problems, but:

To setup a specific day, use the `start-today` task:

```sh
deno task start-today
```

You can also pull for a separate day by adding the day as an argument:

```sh
deno task start-today 7
```

> [!NOTE]
> This command only works on Linux right now, since I hardcoded the use of `xdg-open` to show the problem website.
