/* =====================================================
   AJ DIGITAL POINT
   Main JavaScript
===================================================== */


/* =====================================================
   SEARCH
===================================================== */

function searchPortal() {

    const input =
        document.getElementById("portalSearch");

    const searchText =
        input.value.trim().toLowerCase();

    if (searchText === "") {

        showMessage(
            "कृपया Job, Form या Service का नाम लिखें।"
        );

        return;
    }


    const allItems =
        document.querySelectorAll(
            ".service-box, .update-item, .info-card"
        );


    let found = false;


    allItems.forEach(function(item) {

        const text =
            item.innerText.toLowerCase();

        if (text.includes(searchText)) {

            item.style.outline =
                "3px solid red";

            item.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            found = true;

        } else {

            item.style.outline = "";

        }

    });


    if (!found) {

        showMessage(
            "इस नाम की Service अभी नहीं मिली।"
        );

    }

}


/* =====================================================
   ENTER KEY SEARCH
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const search =
            document.getElementById(
                "portalSearch"
            );


        if (search) {

            search.addEventListener(
                "keydown",
                function(event) {

                    if (event.key === "Enter") {

                        searchPortal();

                    }

                }
            );

        }

    }
);


/* =====================================================
   MESSAGE
===================================================== */

function showMessage(message) {

    const box =
        document.getElementById(
            "messageBox"
        );

    const text =
        document.getElementById(
            "messageText"
        );


    if (!box || !text) {
        return;
    }


    text.textContent = message;

    box.style.display = "block";


    setTimeout(function() {

        box.style.display = "none";

    }, 3500);

}


/* =====================================================
   CLOSE MESSAGE
===================================================== */

function closeMessage() {

    const box =
        document.getElementById(
            "messageBox"
        );


    if (box) {

        box.style.display = "none";

    }

}


/* =====================================================
   VIEW MORE
===================================================== */

function showAllUpdates(type) {

    if (type === "latest") {

        showMessage(
            "Latest Updates के और options जल्द जोड़े जाएंगे।"
        );

        return;
    }


    if (type === "upcoming") {

        showMessage(
            "Upcoming Services जल्द update की जाएंगी।"
        );

        return;
    }

}


/* =====================================================
   CLEAR SEARCH HIGHLIGHT
===================================================== */

const searchInput =
    document.getElementById(
        "portalSearch"
    );


if (searchInput) {

    searchInput.addEventListener(
        "input",
        function() {

            if (
                searchInput.value.trim() === ""
            ) {

                document
                    .querySelectorAll(
                        ".service-box, .update-item, .info-card"
                    )
                    .forEach(function(item) {

                        item.style.outline = "";

                    });

            }

        }
    );

}
