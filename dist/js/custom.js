$(function () {
  initScrollToTop();
});

function initScrollToTop() {
  //Check to see if the window is top if not then display button
  $(window).scroll(function () {
    var scrollTop = $(window).scrollTop(),
      docHeight = $(document).height(),
      winHeight = $(window).height(),
      scrollPercent = scrollTop / (docHeight - winHeight),
      scrollPercentRounded = Math.round(scrollPercent * 100);
    if (scrollPercentRounded > 50) {
      $(".topTop").css({
        opacity: 1,
        transform: "translateY(-50%)",
      });
    } else {
      $(".topTop").css({
        opacity: 0,
        transform: "translateY(50%)",
      });
    }
  });

  // Click event to scroll to top
  $(".topTop").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1000
    );
    return false;
  });
}
window.addEventListener("scroll", function () {
  var navbar = document.querySelector(".navbar"); // Use querySelector instead of getElementById
  if (window.scrollY > 100) {
    navbar.classList.add("fixed");
    navbar.style.opacity = "1";
  } else {
    navbar.classList.remove("fixed");
    navbar.style.opacity = "1";
  }
});

$(document).ready(function () {
  function filterGroup(group) {
    $(".dish-content").hide();
    $(".dish-content")
      .filter("." + group)
      .show();
    $(".cat-links a").removeClass("active");
    $(".cat-" + group.split("-")[1]).addClass("active");
  }

  $(".cat-1").click(function () {
    filterGroup("group-1");
  });
  $(".cat-2").click(function () {
    filterGroup("group-2");
  });
  $(".cat-3").click(function () {
    filterGroup("group-3");
  });
  $(".cat-4").click(function () {
    filterGroup("group-4");
  });

  // Check for an already active button and show its content
  var activeButton = $(".cat-links a.active");
  if (activeButton.length > 0) {
    var activeGroup =
      "group-" + activeButton.attr("class").split(" ")[0].split("-")[1];
    filterGroup(activeGroup);
  } else {
    // Initially show Category 1 and add active class to the button if no active button found
    filterGroup("group-1");
  }
});

$(".slider").slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  dots: false,
  nextArrow: ".next-btn",
  prevArrow: ".prev-btn",
  centerMode: true,
  centerPadding: "0px",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 2,
      },
    },
  ],
});
