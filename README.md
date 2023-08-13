# Procedural-3D-Maze-Generator

![main_gif](https://github.com/irrevocablesake/Procedural-3D-Maze-Generator/blob/main/video_example/output_compressed.mp4)

This is a Procedural 3D Maze Generator, all of the things you see above are created in code, programmmed in the following technologies:
**Languages:** Python, Javascript, HTML, CSS, C++
**Frameworks:** React JS, React Three Fiber, Zustand, Flask, Blender, SFML

The website works as follows:
1) User loads the website and starts the Game
2) Front end requests "maze schematic" in the form of JSON, from the backend
3) The backend, then calls the C++ program
4) The C++ program returns a "maze schematic" in the form of JSON
5) Backend relays that JSON to the front end
6) Front end renders the JSON

The Maze parameters are highly customizable, examples of customizable properties:
1) Camera: position, zoom, FOV
2) Ball: size, color, emission
3) Maze: wall height, wall width, cell size, base size, colors 
4) Lights: Colors, position, size

Initially, I had put these on the frontend, so the user themselves can adjust these parameters, but soon I realized that: "The more customizable a website is, the more complex it becomes to use" ~ And my agenda was to produce a simple "on-click" start game, that produces "fully procedural mazes" ~ that is new mazes everytime
