var projects = 
[
    [ "HyperFractal", 
        "2022", 
        "an interative fractal rendering tool i wrote for my A Level Computer Science coursework.", 
        "projects/hyperfractal.html", 
        "projects/hyperfractal.jpg",
        [ "C++", "graphics", "math" ],
        "https://github.com/oculometric/HyperFractal", "Github" ],
    [ "STUI", 
        "Aug 2024 - ongoing", 
        "a lightweight, easy-to-use, header-only, semi-immediate-mode text UI framework for building simple interfaces, inside the terminal, across platforms.", 
        "projects/stui.html", 
        "projects/stui/stui-thumb.png",
        [ "C++", "ASCII-art" ],
        "https://github.com/oculometric/STUI", "Github" ],
    [ "novos", 
        "Dec 2023 - ongoing", 
        "my work-in-progress toy kernel/operating system project, creating a bootable, retro space-themed videogame (hopefully).", 
        "projects/novos.html", 
        "projects/novos-monkey.gif",
        [ "C++", "graphics", "low-level", "asm" ],
        "https://github.com/oculometric/novos", "Github" ],
    [ "GL 1.X space game", 
        "Mar - May 2024", 
        "OpenGL graphical project created for an assignment, set in space.", 
        "projects/gp-space.html", 
        "projects/gp-space/gp-space-1.jpg",
        [ "C++", "graphics", "OpenGL" ],
        "https://github.com/oculometric/GP-Assessment-1", "Github" ],
    [ "planetarium", 
        "May 2024 - ongoing", 
        "Vulkan API self-teach, and Google Earth alternative client (when it's finished).", 
        "projects/planetarium.html", 
        "projects/planetarium.GIF",
        [ "C++", "graphics", "Vulkan" ],
        "https://github.com/oculometric/planetarium", "Github" ],
    [ "A Lonely Greenhouse", 
        "Apr - Sep 2023", 
        "a lo-fi, pixel-art puzzle game about exploring an abandoned greenhouse above the clouds.", 
        "projects/greenhouse.html", 
        "projects/greenhouse/greenhouse-thumb.jpg",
        [ "C#", "Unity", "pixel-art" ],
        "https://oculometric.itch.io/a-lonely-greenhouse", "Itch" ],
    [ "agaricus obscura", 
        "Nov 2023", 
        "a terminal-based game inspired by the original Legend of Zelda.", 
        "projects/agaricus-obscura.html", 
        "projects/agaricus-obscura/agaricus-obscura-thumb.jpg",
        [ "C++", "ASCII-art" ],
        "https://github.com/oculometric/agaricus-obscura", "Github" ],
    [ "\'connect\'", 
        "Jul 2024", 
        "a stylised art project made in Blender and Inkscape, featuring rich procedural compositing and materials as well as traditional modelling.", 
        "projects/connect.html", 
        "projects/connect/connect-thumb.jpg",
        [ "art", "Blender", "Inkscape", "surrealism" ],
        "https://oculometric.artstation.com/projects/8bQA6n", "Artstation" ],
    [ "\'untitled stairway II\'", 
        "Oct 2023", 
        "an art project about decay.", 
        "projects/untitled-stairway.html", 
        "projects/untitled-stairway-1.jpg",
        [ "art", "Blender", "graphite" ],
        "https://oculometric.artstation.com/projects/49eR5l", "Artstation" ],
    [ "Tate Modern + Tate Britain", 
        "Aug - Nov 2022", 
        "two of my artworks which were exhibited in well-known galleries in London as part of initiatives run by the Tate Collective.", 
        "projects/tate-modern-britain.html", 
        "projects/tate-britain.jpg",
        [ "art", "Blender", "graphite" ],
        "https://oculometric.artstation.com/projects/qQkPdL", "Artstation" ],
    [ "mechanical spider", 
        "Mar 2023", 
        "a personal asset challenge testing hard-surface modelling and animation skills.", 
        "projects/spider.html", 
        "projects/spider-2.gif",
        [ "asset", "Blender" ],
        "https://oculometric.artstation.com/projects/dK0J91", "Artstation" ],
    [ "\'pipe grotto\'", 
        "May 2023", 
        "an art project placed in an empty, liminal courtyard.", 
        "projects/pipe-grotto.html", 
        "projects/pipe-grotto-thumb.jpg",
        [ "art", "Blender", "pixel-art" ],
        "https://oculometric.artstation.com/projects/8b1PER", "Artstation" ],
    [ "Movement Detroit commission", 
        "Sep 2023 - Feb 2024", 
        "a promotional video for the festival in Detroit.", 
        "projects/movement-detroit.html", 
        "projects/movement-detroit/movement-detroit-thumb.jpg",
        [ "commission", "Blender", "DaVinci Resolve" ],
        "https://www.youtube.com/watch?v=zRSqF18pbqg", "YouTube" ],
];

function enumerateProjects()
{
    var z, i, elmnt;
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++)
    {
        elmnt = z[i];
        if (elmnt.hasAttribute("project-div"))
        {
            for (var inputs of projects)
            {
                var title = inputs[0];
                var date = inputs[1];
                var description = inputs[2];
                var link = inputs[3];
                var image = inputs[4];
                var tags = inputs[5];
                var alt_link = inputs[6];
                var alt_link_name = inputs[7];

                var tags_html = "";
                for (var tag of tags)
                {
                    tags_html = tags_html + "<span class=\"badge\" style=\"margin-right: 1ch; background-color: var(--carmine)\">#" + tag + "</span>";
                }

                var buttons_html = "";
                if (alt_link && alt_link_name)
                {
                    buttons_html += "<div style=\"float: right; margin-right: 2ch; margin-left: 2ch;\">";
                    buttons_html += "<a href=\"" + link + "\"><button style=\"float: right; height: 3lh; width: 100%; \">[ more info ]</button></a><br><br><br><br>";
                    buttons_html += "<a href=\"" + alt_link + "\"><button style=\"float: right; height: 3lh; width: 100%;\">[ " + alt_link_name + " ]</button></a>";
                    buttons_html += "</div>";
                }
                else
                {
                    buttons_html += "<a href=\"" + link + "\"><button style=\"float: right; height: 7lh; margin-right: 2ch; margin-left: 2ch;\">[ more info ]</button></a>";
                }

                var html = "<div class=\"bordered_box\" style=\"height: calc(var(--line-height) * 11);\">\
                <a href=\"" + link + "\"><span class=\"badge\">[ " + title + " ]</span></a> \
                <span class=\"hollow_badge\" style=\"float: right;\">" + date + "</span> \
                <br><br> \
                <div style=\"width: calc((var(--line-height) * 7) + 4ch); height: calc(var(--line-height) * 7); float: left;\"> \
                    <a href=\"" + link + "\"><img src=\"" + image + "\" href=\"" + link + "\" style=\"display: block; padding-top: 0; max-height: 100%; max-width: 100%;\"></a> \
                </div> \
                <div style=\"display: inline; width: calc(100% - 10ch - calc(var(--line-height) * 7))\">"
                    + buttons_html +
                    "<p style=\"height: calc(var(--line-height) * 6);\">" + description + "</p> \
                    <div>" + tags_html + "</div> \
                </div> \
                </div>";

                elmnt.innerHTML = elmnt.innerHTML + html;
            }
            return;
        }
    }
}