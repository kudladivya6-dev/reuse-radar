/* =================================
   REUSE RADAR MVP
   ================================= */


/* ================================
   CAMPUS ITEMS
================================ */

const items = [

    {
        id: 1,
        name: "Scientific Calculator",
        category: "Academic",
        condition: "Good",
        icon: "🧮"
    },

    {
        id: 2,
        name: "Engineering Drawing Kit",
        category: "Academic",
        condition: "Good",
        icon: "📐"
    },

    {
        id: 3,
        name: "Project Cardboard",
        category: "Project",
        condition: "Good",
        icon: "📦"
    },

    {
        id: 4,
        name: "Notebook",
        category: "Stationery",
        condition: "New",
        icon: "📓"
    },

    {
        id: 5,
        name: "USB Keyboard",
        category: "Electronics",
        condition: "Good",
        icon: "⌨️"
    },

    {
        id: 6,
        name: "Pen Set",
        category: "Stationery",
        condition: "Good",
        icon: "🖊️"
    }

];


/* ================================
   GET HTML ELEMENTS
================================ */

const container =
    document.getElementById("itemsContainer");

const searchInput =
    document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");

const reuseCount =
    document.getElementById("reuseCount");

const requestCount =
    document.getElementById("requestCount");

const purchaseCount =
    document.getElementById("purchaseCount");


/* ================================
   DASHBOARD DATA
================================ */

let requests = 0;

let reused = 0;

let purchasesAvoided = 0;


/* ================================
   SHOW ITEMS
================================ */

function showItems(list) {

    container.innerHTML = "";


    if (list.length === 0) {

        container.innerHTML = `
            <div class="no-items">

                <h3>
                    🔍 No items found
                </h3>

                <p>
                    Try another item or category.
                </p>

            </div>
        `;

        return;
    }


    list.forEach(function(item) {

        const card =
            document.createElement("div");

        card.className = "item-card";


        card.innerHTML = `

            <div class="item-icon">
                ${item.icon}
            </div>

            <h3>
                ${item.name}
            </h3>

            <span class="category">
                ${item.category}
            </span>

            <p class="condition">
                Condition:
                <strong>
                    ${item.condition}
                </strong>
            </p>

            <p class="available">
                🟢 Available
            </p>

            <button
                class="request-btn"
                onclick="requestItem(${item.id})"
            >
                Request Item
            </button>

        `;


        container.appendChild(card);

    });

}


/* ================================
   SEARCH + FILTER
================================ */

function filterItems() {

    const text =
        searchInput.value
            .toLowerCase()
            .trim();


    const category =
        categoryFilter.value;


    const result =
        items.filter(function(item) {

            const searchMatch =
                item.name
                    .toLowerCase()
                    .includes(text);


            const categoryMatch =
                category === "all" ||
                item.category === category;


            return searchMatch &&
                   categoryMatch;

        });


    showItems(result);

}


/* ================================
   REQUEST ITEM
================================ */

function requestItem(id) {

    const item =
        items.find(function(item) {

            return item.id === id;

        });


    if (!item) {
        return;
    }


    requests++;

    reused++;

    purchasesAvoided++;


    requestCount.textContent =
        requests;

    reuseCount.textContent =
        reused;

    purchaseCount.textContent =
        purchasesAvoided;


    alert(
        "✅ Request Sent Successfully!\n\n" +
        item.name +
        "\n\nThe item has been requested."
    );

}


/* ================================
   EVENTS
================================ */

searchInput.addEventListener(
    "input",
    filterItems
);


categoryFilter.addEventListener(
    "change",
    filterItems
);


/* ================================
   INITIAL LOAD
================================ */

showItems(items);