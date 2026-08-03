var active_filters =
    [
        "", // types
        "", // collections
        "", // tools
        ""  // tags
    ]

var columns = 3;

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
    setSearchParam(4, columns.toString(10) + '|');
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

var generic_names = ["type", "collection", "tool", "tag", "columns"];

function setSearchParam(index, value) {
    var url = new URL(window.location);
    if (value == "")
        url.searchParams.delete(generic_names[index]);
    else
        url.searchParams.set(generic_names[index], value.slice(0, value.length - 1));
    history.pushState({}, null, url);
}

function toggleGeneric(button, index) {
    var filter_name = button.innerHTML;
    if (active_filters[index].includes(filter_name)) {
        active_filters[index] = active_filters[index].replaceAll(filter_name + '|', "");
        setUnHighlighted(button);
    }
    else {
        active_filters[index] += filter_name + '|';
        setHighlighted(button);
    }

    setSearchParam(index, active_filters[index]);
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
        active_filters[i] = url.searchParams.get(generic_names[i]);
        if (active_filters[i] == null) active_filters[i] = "";
        else active_filters[i] += '|'
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
}

function filterItems() {
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
    const rows = 10;
    var items_count = 0;
    for (var r = 0; r < rows; r++) {
        html += '<tr>\n';
        for (var c = 0; c < columns; c++) {
            items_count++;
            var project_name = "PROJECT" + ((r * columns) + c);
            html += '<td>\n';
            html += '<div class="bordered_box" style="height:' + h + 'lh;"><br>';
            html += '<img src="favicon-32x32.png" style="display: block; height: ' + (h - 2) + 'lh; padding: 8px; background-color: transparent;" />'
            html += '<span class="hollow_badge" style="float: left; margin-top:0lh;">'
            html += project_name;
            html += '</span>'
            html += '</div>\n';
            html += '</td>\n';
        }
        html += '</tr>\n';
    }
    html += '</table>';
    item.innerHTML = html;
    document.getElementById("itemscount").innerHTML = '[ ' + items_count + ' items ]';
}