// page loading effect
window.addEventListener("load", () => {
    document.querySelector(".page-loader").classList.add("slide-out-right");
    setTimeout(() => {
        document.querySelector(".page-loader").style.display = "none";
    }, 1500);
});

//start scroll bar
let progress = document.getElementById('progressbar');
let totalHeight = document.body.scrollHeight - window.innerHeight;
window.onscroll = function () {
    let progressHeight = (window.pageYOffset / totalHeight) * 100;
    progress.style.height = progressHeight + "%";
}
//end scrollbar


//toggle body scrolling
function toggleBodyScrolling() {
    document.body.classList.toggle("hide-scrolling");
}



// navigation menu

// show nav menu small
const navMenu = document.getElementById('nav_menu'),
    navToggle = document.getElementById('nav_toggle'),
    navClose = document.getElementById('nav_close')

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    })
}
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    })
}

const navLink = document.querySelectorAll('.nav_link')

function linkAction() {
    const navMenu = document.getElementById('nav_menu')
    // when we click on each nav menu we remove the show menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


// home text animating effect
const texts = ['Graphic Designer', 'Website Designer', 'Social Marketter'];
let count = 0;
let index = 0;
let currentText = '';
let letter = '';

(function type() {
    if (count === texts.length) {
        count = 0;
    }
    currentText = texts[count];
    letter = currentText.slice(0, ++index);
    document.querySelector('.typing').textContent = letter;
    if (letter.length === currentText.length) {
        count++;
        index = 0;
    }
    setTimeout(type, 200);

}());


// about main section tabs
const tabsContainer = document.querySelector(".about-tabs"),
    aboutSection = document.querySelector(".about-section");

tabsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("tab-item") && !e.target.classList.contains("on")) {
        tabsContainer.querySelector(".on").classList.remove
            ("on");
        e.target.classList.add("on");
        const target = e.target.getAttribute("data-target");
        aboutSection.querySelector(".tab-content.on").classList.remove("on");
        aboutSection.querySelector(target).classList.add("on");
    }

});
// about mobile section tabs
const mtabsContainer = document.querySelector(".mobile-tabs"),
    maboutSection = document.querySelector(".mobile-about");

mtabsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("mtab-item") && !e.target.classList.contains("off")) {
        mtabsContainer.querySelector(".off").classList.remove("off");
        e.target.classList.add("off");
        const target = e.target.getAttribute("data-target");
        maboutSection.querySelector(".mtab-content.off").classList.remove("off");
        maboutSection.querySelector(target).classList.add("off");
    }

});


// skills bar and records animation
const skills_wrap = document.querySelector(".skills");
const skills_bars = document.querySelectorAll(".skill-progress");
const records_wrap = document.querySelector(".records");
const records_numbers = document.querySelectorAll(".number");

/*-----------------portfolioPopup----------------*/
window.addEventListener("scroll", () => {
    skillsEffect();
    countUp();
});
function checkScroll(el) {
    let rect = el.getBoundingClientRect();
    if (window.innerHeight >= rect.top + el.offsetHeight) return true;
    return false;
}
function skillsEffect() {
    if (!checkScroll(skills_wrap)) return;
    skills_bars.forEach((skill) => (skill.style.width = skill.dataset.progress));
}

function countUp() {
    if (!checkScroll(records_wrap)) return;


    records_numbers.forEach((numb) => {
        const updateCount = () => {
            let currentNum = +numb.innerText;
            let maxNum = +numb.dataset.num;
            let speed = 200;
            const increment = Math.ceil(maxNum / speed);

            if (currentNum < maxNum) {
                numb.innerText = currentNum + increment;
                setTimeout(updateCount, 1);
            }
            else {
                numb.innerText = maxNum;
            }
        };
        setTimeout(updateCount, 400);
    });
}

function toggleBodyScrolling() {
    document.body.classList.toggle("hide-scrolling");
}


// skills accordion 
const accordion = document.getElementsByClassName('timeline-item');
for (i = 0; i < accordion.length; i++){
    accordion[i].addEventListener('click', function () {
        this.classList.toggle('active')
    })
}

/*-----------------portfolioPopup----------------*/


// FilterPortfolioButtons
const filterBtnsContainer = document.querySelector(".portfolio-filter");
let portfolioItems;
filterBtnsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("portfolio-filter-btn") &&
        !e.target.classList.contains("active")) {
        filterBtnsContainer.querySelector(".active").classList.remove("active");
        e.target.classList.add("active");
        filterItems(e.target);
        toggleBodyScrolling();
        document.querySelector(".filter-status").classList.add("active");
        document.querySelector(".filter-status p").innerHTML = `<span>${e.target.innerHTML}</span> Projects`;
        setTimeout(() => {
            filterItems(e.target);
        }, 1700);
        setTimeout(() => {
            document.querySelector(".filter-status").classList.remove("active");
            toggleBodyScrolling();
        }, 2000);
    }
});


// portfolioButtonsFilter


function filterItems(filterBtn) {
    const selectedCategory = filterBtn.getAttribute("data-filter");
    document.querySelectorAll(".portfolio-item").forEach((item) => {
        const category = item.getAttribute("data-category");
        if (category.indexOf(selectedCategory) !== -1 || selectedCategory === "all") {
            item.classList.add("show");
        }
        else {
            item.classList.remove("show");
        }
    });
    portfolioItems = document.querySelectorAll(".portfolio-item.show");
}
filterItems(document.querySelector(".portfolio-filter-btn.active"));


// portfolio item details popup 
let portfolioItemIndex;
document.addEventListener("click", (e) => {
    if (e.target.closest(".view-projects")) {
        const currentItem = e.target.closest(".portfolio-item");
        portfolioItemIndex = Array.from(portfolioItems).indexOf(currentItem);
        togglePopup();
        portfolioItemsDetails(e.target.parentElement);
        updateNextPrevItem();
    }
});
function togglePopup() {
    document.querySelector(".portfolio-popup").classList.toggle("open")
}
document.querySelector(".pp-close-btn").addEventListener("click", togglePopup)

function portfolioItemsDetails(portfolioItem) {
    document.querySelector(".pp-thumbnail img").src = portfolioItems[portfolioItemIndex].querySelector("img").src;


    document.querySelector(".pp-counter").innerHTML = `${portfolioItemIndex + 1} of ${portfolioItems.length}`;

}
function updateNextPrevItem() {
    if (portfolioItemIndex !== 0) {
        document.querySelector(".pp-footer-left").classList.remove("hidden");
    }
    else
    {
        document.querySelector(".pp-footer-left").classList.add("hidden");
    }

    if (portfolioItemIndex !== portfolioItems.length - 1) {
        document.querySelector(".pp-footer-right").classList.remove("hidden");
    }
    else {
        document.querySelector(".pp-footer-right").classList.add("hidden");
    }
}
document.querySelector(".pp-prev-btn").addEventListener("click", () => {
    changePortfolioItem("prev");
});
document.querySelector(".pp-next-btn").addEventListener("click", () => {
    changePortfolioItem("next");
});

function changePortfolioItem(direction) {
    if (direction == "prev") {
        portfolioItemIndex--;
    }
    else
    {
        portfolioItemIndex++;
    }
    document.querySelector(".pp-overlay").classList.add(direction);
    setTimeout(() => {
        document.querySelector(".pp-inner").scrollTo(0, 0);
        portfolioItemsDetails();
        updateNextPrevItem();
    }, 400);
    setTimeout(() => {
        document.querySelector(".pp-overlay").classList.remove(direction);
    }, 1000)

}

// View projects functions


// testimonial slider
var indexValue = 1;
showImg(indexValue);
function btmSlide(e) { showImg(indexValue = e); }
function sideSlide(e) { showImg(indexValue += e); }
function showImg(e) {
    var i;
    const img = document.querySelectorAll(".images");
    const sliders = document.querySelectorAll(".btm-sliders span");
    if (e > img.length) { indexValue = 1 }
    if (e < 1) { indexValue = img.length }
    for (i = 0; i < img.length; i++) {
        img[i].style.display = "none";
    }
    for (i = 0; i < sliders.length; i++) {
        sliders[i].style.background = "none";
    }
    img[indexValue - 1].style.display = "block";
    sliders[indexValue - 1].style.background = "white";
}

// ===========================================CONTACT ME SECTION==========================================

//  email validation
function validate() {
    const form = document.getElementById('form');
    const email = document.getElementById('email').value;
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/

    if (email.match(pattern)) {
        form.classList.add('valid')
        form.classList.remove('invalid')
    }
    else
    {
        form.classList.add('invalid')
        form.classList.remove('valid')

    }
    if (email == "") {
        form.classList.remove('invalid')
        form.classList.remove('valid')

    }

}

// sending message as email

// function sendEmail() {
//     Email.send({
//         Host: "smtp.gmail.com",
//         Username: "samnjirigah02@gmail.com",
//         Password: "36822582",
//         To: 'samnjirigah02@gmail.com',
//         From: document.getElementById("email").value,
//         Subject: "New Contact Form Enquiry",
//         Body: "Name:" + document.getElementById("name").value
//             + "<br> Email: " + document.getElementById("email").value
//             + "<br> Phone Number: " + document.getElementById("phoneNumber").value
//             + "<br> Message: " + document.getElementById("message").value

//     }).then(
//             message = alert("message Sent Successfully")
//         );
// }