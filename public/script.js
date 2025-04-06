document.addEventListener('DOMContentLoaded', function() {
   

    const links = document.querySelectorAll("a[data-scroll-nav]"); //selecting all a tags with data scroll nav
    links.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            const targetIndex = this.getAttribute("data-scroll-nav"); // getting the attribute value
            const targetElement = document.querySelector("[data-scroll-index='" + targetIndex + "']");
            const targetOffset = targetElement.offsetTop;

            window.scrollTo({
                top: targetOffset,
                behavior: 'smooth' 
            });

            const navbarCollapse = document.querySelector(".navbar-collapse");
            if (navbarCollapse) {
                navbarCollapse.classList.remove("show"); // Hide navbar if needed
            }
        });
    });

    
    const hadisButton = document.getElementById("hadisbutton");
    if (hadisButton) {
        hadisButton.addEventListener('click', function() {
            fetch('/api/hadith')
                .then(response => response.json())
                .then(data => {
                    //to make sure the hadith is not too big for the container, only <200 characther hadis is allowed
                    if (data.hadiths && data.hadiths.data && data.hadiths.data.length  > 0) {
                        const validHadiths = data.hadiths.data.filter(hadith => hadith.hadithEnglish.length < 100);
                        
                        if (validHadiths.length > 0) {
                            const randomHadith = validHadiths[Math.floor(Math.random() * validHadiths.length)];
                            console.log(randomHadith.hadithEnglish);

                            //displaying hadith in the container
                            document.getElementById("hadiscontainer").innerHTML = `
                                Arabic: ${randomHadith.hadithArabic}<br><br>
                                English: ${randomHadith.hadithEnglish}<br><br>
                                Book: ${randomHadith.book.bookName}<br>Status: ${randomHadith.status}`;
                        } else {
                            console.log("No hadith with less than 100 characters found.");
                        }
                    } else {
                        console.log("No hadith found.");
                    }
                })
                .catch(error => {
                    console.log("Error fetching hadith:", error);
                });
        });
    }

    
    const alquranButton = document.getElementById("alquranbutton");
    if (alquranButton) {
        alquranButton.addEventListener('click', function() {
            const surah = Math.floor(Math.random() * 114) + 1;
            const url1 = `https://quranapi.pages.dev/api/${surah}.json`;

            fetch(url1)
                .then(response => response.json())
                .then(surahData => {
                    const totalAyat = surahData.totalAyah;
                    console.log(surahData.surahName + totalAyat);

                    const ayah = Math.floor(Math.random() * totalAyat) + 1;
                    const url2 = `https://quranapi.pages.dev/api/${surah}/${ayah}.json`;

                    fetch(url2)
                        .then(response => response.json())
                        .then(ayahData => {
                            const a = ayahData;
                            console.log(a);
                            document.getElementById("alqurancontainer").innerHTML = `
                                <h2>${a.arabic1}</h2><br><br> 
                                <div class="surahProperty"> 
                                ${a.english}<br><br>
                                Surah: ${a.surahName} ${a.surahNo}:${a.ayahNo}
                                </div>`;
                        })
                        .catch(error => {
                            console.log("Error fetching ayah:", error);
                        });
                })
                .catch(error => {
                    console.log("Error fetching surah:", error);
                });
        });
    }
});
