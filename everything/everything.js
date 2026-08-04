var active_filters =
    [
        [], // types
        [], // collections
        [], // tools
        []  // tags
    ]

function combine(list) {
    var out = "";
    for (var i = 0; i < list.length; i++)
        out += list[i] + '|';
    if (out.length > 0)
        out = out.substring(0, out.length - 1);
    return out;
}

var columns = 3;

var internal_database = [];

function setColumns(cols) {
    if (columns == 1)
        setUnHighlighted(document.getElementById("c1but"));
    if (columns == 2)
        setUnHighlighted(document.getElementById("c2but"));
    if (columns == 3)
        setUnHighlighted(document.getElementById("c3but"));
    if (columns == 4)
        setUnHighlighted(document.getElementById("c4but"));
    columns = cols;
    if (columns == 1)
        setHighlighted(document.getElementById("c1but"));
    if (columns == 2)
        setHighlighted(document.getElementById("c2but"));
    if (columns == 3)
        setHighlighted(document.getElementById("c3but"));
    if (columns == 4)
        setHighlighted(document.getElementById("c4but"));
    setSearchParam(4, columns.toString(10));
    filterItems();
}

function setHighlighted(button) {
    button.style["color"] = "var(--nearblack)";
    button.style["background-color"] = "var(--indigo)";
}

function setUnHighlighted(button) {
    button.style["background-color"] = "";
    button.style["color"] = "";
}

var generic_names = ["type", "collection", "tool", "tag", "columns", "expanded"];

function setSearchParam(index, value) {
    var url = new URL(window.location);
    if (value == "")
        url.searchParams.delete(generic_names[index]);
    else
        url.searchParams.set(generic_names[index], value.slice(0, value.length));
    history.pushState({}, null, url);
}

function toggleGeneric(button, index) {
    var filter_name = button.innerHTML;
    if (active_filters[index].includes(filter_name)) {
        active_filters[index].splice(active_filters[index].indexOf(filter_name), 1);
        setUnHighlighted(button);
    }
    else {
        active_filters[index].push(filter_name);
        setHighlighted(button);
    }

    setSearchParam(index, combine(active_filters[index]));
    filterItems();
}

function toggleType() {
    toggleGeneric(document.activeElement, 0);
}

function toggleCollection() {
    toggleGeneric(document.activeElement, 1);
}

function toggleTool() {
    toggleGeneric(document.activeElement, 2);
}

function toggleTag() {
    toggleGeneric(document.activeElement, 3);
}

function clearFilters() {
    setSearchParam(0, "");
    setSearchParam(1, "");
    setSearchParam(2, "");
    setSearchParam(3, "");
    loadSearchParams();
    filterItems();
}

function loadSearchParams() {
    var url = new URL(window.location);
    for (var i = 0; i < 4; i++) {
        if (url.searchParams.has(generic_names[i]))
            active_filters[i] = url.searchParams.get(generic_names[i]).split('|');
        else active_filters[i] = [];
    }
    if (url.searchParams.has(generic_names[4]))
        columns = Number.parseInt(url.searchParams.get(generic_names[4]));
    else columns = 3;

    z = document.getElementsByClassName("flasher");
    for (i = 0; i < z.length; i++) {
        if (active_filters[0].includes(z[i].innerHTML) || active_filters[1].includes(z[i].innerHTML) || active_filters[2].includes(z[i].innerHTML) || active_filters[3].includes(z[i].innerHTML))
            setHighlighted(z[i]);
        else
            setUnHighlighted(z[i]);
    }

    if (columns == 1)
        setHighlighted(document.getElementById("c1but"));
    if (columns == 2)
        setHighlighted(document.getElementById("c2but"));
    if (columns == 3)
        setHighlighted(document.getElementById("c3but"));
    if (columns == 4)
        setHighlighted(document.getElementById("c4but"));

    filterItems();
    if (url.searchParams.has(generic_names[5]))
        showDetail(url.searchParams.get(generic_names[5]));
    else closeDetail();
}

async function getDatabase() {
    const databases = [
        "/everything/projects_2017.json",
        "/everything/projects_2018.json",
        "/everything/projects_2019.json",
        "/everything/projects_2020.json",
        "/everything/projects_2021.json",
        "/everything/projects_2022.json",
        "/everything/projects_2023.json",
        "/everything/projects_2024.json",
        "/everything/projects_2025.json",
        "/everything/projects_2026.json",
    ];

    internal_database = [];

    for (var i = 0; i < databases.length; i++) {
        var url = databases[i];
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            internal_database = internal_database.concat((await response.json()).projects);
        } catch (error) {
            console.error(error.message);
        }
    }

    filterItems();
}

var filtered_items = [];

function intersectLists(l1, l2) {
    if (l1.length == 0)
        return true;
    for (var i = 0; i < l1.length; i++) {
        if (l2.includes(l1[i].toLowerCase()))
            return true;
    }
    return false;
}

function refilterDatabase() {
    filtered_items = [];
    for (var i = 0; i < internal_database.length; i++) {
        if ((active_filters[0].includes(internal_database[i].type) || active_filters[0].length == 0) &&
            intersectLists(active_filters[1], internal_database[i].collections) &&
            intersectLists(active_filters[2], internal_database[i].tools) &&
            intersectLists(active_filters[3], internal_database[i].tags)) {
            filtered_items.push(i);
        }
    }
}

function filterItems() {
    refilterDatabase();
    var item = document.getElementById("items");
    var html = '<table style="width: 100%; table-layout: fixed; border: none; border-spacing: 0px;">\n';
    var h = 10;
    if (columns == 1)
        h = 28;
    else if (columns == 2)
        h = 15;
    else if (columns == 3)
        h = 10;
    else if (columns == 4)
        h = 8;
    var items_count = 0;
    for (var i = 0; i < filtered_items.length; i++) {
        html += '<tr>\n';
        for (var c = 0; c < columns; c++) {
            if (i >= filtered_items.length) {
                html += '<td>\n';
                html += '</td>\n';
                continue;
            }
            items_count++;
            var project = internal_database[filtered_items[i]];
            var project_name = project.name;
            html += '<td onclick="showDetail(\'' + project_name + '\');">\n';
            html += '<div class="bordered_box" style="height:' + h + 'lh;"><br>';
            html += '<img src="' + '/everything/' + project.image + '" style="display: block; height: ' + (h - 2) + 'lh; padding: 8px; background-color: transparent;" />'
            html += '<span class="hollow_badge" style="float: left; margin-top:0lh;">'
            html += project_name;
            html += '</span>'
            html += '</div>\n';
            html += '</td>\n';
            i++;
        }
        html += '</tr>\n';
    }
    html += '</table>';
    item.innerHTML = html;
    document.getElementById("itemscount").innerHTML = '[ ' + items_count + '/' + internal_database.length + ' items ]';
}

function showDetail(name) {
    var detail_box = document.getElementById("detail");
    var project_id = 0;
    for (project_id = 0; project_id < filtered_items.length; project_id++) {
        if (internal_database[filtered_items[project_id]].name == name)
            break;
    }
    var project = internal_database[filtered_items[project_id]];
    detail_box.removeAttribute("hidden");
    document.getElementById("detail_image").src = '/everything/' + project.image;
    document.getElementById("detail_name").innerHTML = project.name;
    document.getElementById("detail_date").innerHTML = '[ ' + project.date + ' ]';
    document.getElementById("detail_type").innerHTML = '[ ' + project.type + ' ]';
    setSearchParam(5, name);
}

function closeDetail() {
    document.getElementById("detail").setAttribute("hidden", "");
    setSearchParam(5, "");
}