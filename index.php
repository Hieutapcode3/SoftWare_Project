
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demo AWS</title>
    <link rel="icon" type="image/x-icon" href="./asset/img/Band/Ball.png">
    <link rel="stylesheet" href="./asset/css/style.css">
    <link rel="stylesheet" href="./asset/css/responsive.css">
    <link rel="stylesheet" href="./asset/icon/themify-icons/themify-icons.css">
</head>
<body>
    <div id="wrapper">
        <div id="header">
            <!-- Begin nav -->
            <ul id="nav">
                <li><a href="#">Home</a></li>
                <li><a href="#band">Band</a></li>
                <li><a href="#tour">Tour</a></li>
                <li><a href="#contact">Contact</a></li>
                <li>
                    <a href="#">
                        More 
                        <i class="nav-arrow-down ti-angle-down"></i>
                    </a>
                    <ul class="subnav">
                        <li><a href="#">Merchandise</a></li>
                        <li><a href="#">Extras</a></li>
                        <li><a href="#">Media</a></li>
                    </ul>
                </li>
            </ul>
            <!-- End nav -->
            <!-- Begin search button -->
            <div id="mobile-menu" class="mobile-menu-btn">
                <i class="menu-icon ti-menu"></i>
            </div>
            <div class="search-button">
                <i class="search-icon ti-search"></i>
            </div>
            <!-- End search button -->
        </div>
        
        <div id="slider">
            <div class="text-content">
                <h2 class="text-heading">Chicago</h2>
                <div class="text-description">
                    <b>Thank you, Chicago - A night we won't forget.</b>
                </div>
            </div>
        </div>

        <div id="content">
            <!-- Content Section -->
            <div id="band" class="content-section">
                <h2 class="section-heading">THE BAND</h2>
                <p class="section-subheading">We love music</p>
                <p class="about-content">
                    We have created a fictional band website. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <div class="row member-list">
                    <div class="colum colum-third text-center">
                        <p class="member-name">Name</p>
                        <img src="./asset/img/Band/member1.jpg" alt="Name" class="member-img">
                    </div>
                    <div class="colum colum-third text-center">
                        <p class="member-name">Name</p>
                        <img src="./asset/img/Band/member2.jpg" alt="Name" class="member-img">
                    </div>
                    <div class="colum colum-third text-center">
                        <p class="member-name">Name</p>
                        <img src="./asset/img/Band/member3.jpg" alt="Name" class="member-img">
                    </div>
                </div>

            </div>
            <!-- Tour Section -->
            <div id="tour" class="tour-section">
                <div class="content-section">
                    <h2 class="section-heading text-white">TOUR DATES</h2>
                    <p class="section-subheading text-white">Remember to book your tickets!</p>
                    <!-- Tickets -->
                    <ul class="tickets-list">
                        <li>September <span class="sold-out">Sold out</span></li>
                        <li>October<span class="sold-out">Sold out</span></li>
                        <li>November <span class="quantity">3</span></li>
                    </ul>
                    <!-- Places -->
                    <div class="row place-list">
                        <div class="colum colum-third">
                            <img src="./asset/img/Place/newyork.jpg" alt="New York" class="place-img">
                            <div class="place-body">
                                <h3 class="place-heading">New York</h3>
                                <p class="place-time">Fri 27 Nov 2016</p>
                                <p class="place-desc">Praesent tincidunt sed tellus ut rutrum sed vitae justo.</p>
                                <button class="btn js-buy-ticket">Buy Tickets</button>
                            </div>
                        </div>
                        <div class="colum colum-third">
                            <img src="./asset/img/Place/sanfran.jpg" alt="San Francisco" class="place-img">
                            <div class="place-body">
                                <h3 class="place-heading">San Francisco</h3>
                                <p class="place-time">Sun 29 Nov 2016</p>
                                <p class="place-desc">Praesent tincidunt sed tellus ut rutrum sed vitae justo.</p>
                                <button class="btn js-buy-ticket">Buy Tickets</button>
                            </div>
                        </div>
                        <div class="colum colum-third">
                            <img src="./asset/img/Place/paris.jpg" alt="Paris" class="place-img">
                            <div class="place-body">
                                <h3 class="place-heading">Paris</h3>
                                <p class="place-time">Sat 28 Nov 2016</p>
                                <p class="place-desc">Praesent tincidunt sed tellus ut rutrum sed vitae justo.</p>
                                <button class="btn js-buy-ticket">Buy Tickets</button>
                            </div>
                        </div>
                        <div class="clear"></div>
                    </div>
                </div>
            </div>
            <!-- Contact Section -->
            <div id="contact" class="content-section">
                <h2 class="section-heading">CONTACT</h2>
                <p class="section-subheading">Fan? Drop a note!</p>
                <div class="row contact-content">
                    <div class="colum colum-half contact-infor">
                        <p><i class="ti-location-pin"></i>Chicago, US</p>
                        <p><i class="ti-mobile"></i>Phone: <a href="">+00 151515</a></p>
                        <p><i class="ti-email"></i>Email: <a href="">mail@mail.com</a></p>
                    </div>
                    <div class="colum colum-half contact-form">
                        <form action="">
                            <div class="row">
                                <div class="colum colum-half">
                                    <input type="text" name="" id="" required class="form-control" placeholder="Name">
                                </div>
                                <div class="colum colum-half">
                                    <input type="email" name="" id="" required class="form-control" placeholder="Email">
                                </div>
                            </div>
                            <div class="row">
                                <div class="colum colum-full mt-8">
                                    <input type="text" name="" id="" required class="form-control" placeholder="Message">
                                </div>
                            </div>
                            <input class="btn pull-right mt-16" type="submit" value="SEND">
                        </form>
                    </div>
                </div>

            </div>
            <div class="map-section">
                <img src="./asset/img/Place/map.jpg" alt="">
            </div>
            

        </div>

        <div id="footer">
            <div class="social-list">
                <a target="_blank" href="https://www.facebook.com/profile.php?id=100048093503018" class="ti-facebook"><i></i></a>
                <a href="" class="ti-instagram"><i></i></a>
                <a href="" class="ti-youtube"><i></i></a>
                <a href="" class="ti-pinterest"><i></i></a>
                <a href="" class="ti-twitter"><i></i></a>
                <a href="" class="ti-linkedin"><i></i></a>
            </div>
            <p class="copyright">Powered by <a href="">Hieuthu3</a></p>
            
        </div>
    </div>
    <div class="modal js-modal">
        <div class="modal-container js-modal-container">
            <div class="modal-close js-modal-close ">
                <i class="ti-close"></i>
            </div>
            <header class="modal-header">
                <i class="modal-icon ti-bag"></i>
                T i c k e t s
            </header>
            <div class="modal-body">
                <label for="ticket-quantity" class="modal-label">
                    <i class="ti-shopping-cart"></i>
                    Tickets, $15 per person
                </label>
                <input id="ticket-quantity" type="text" class="modal-input" placeholder="How many">
                <label for="ticket-email" class="modal-label">
                    <i class="ti-user"></i>
                    Send To
                </label>
                <input id="ticket-email" type="email" class="modal-input" placeholder="Enter email....">

                <button id="buy-tickets">
                    Pay <i class="ti-check"></i>
                </button>
            </div>
            <footer class="modal-footer">
                <p class="modal-help">Need <a href="">help?</a></p>
            </footer>
        </div>
    </div>
    <script>
        const buyBtns = document.querySelectorAll('.js-buy-ticket')
        const modal = document.querySelector('.js-modal')
        const modalContainer = document.querySelector('.js-modal-container')
        const close = document.querySelector('.js-modal-close')
        function hideBuyTicket(){
            modal.classList.remove('open')
        }
        function showBuyTicket() {
            modal.classList.add('open')
        }
        for(const buyBtn of buyBtns){
            buyBtn.addEventListener('click',showBuyTicket)
        }
        close.addEventListener('click',hideBuyTicket)
        modal.addEventListener('click',hideBuyTicket)
        modalContainer.addEventListener('click', function(even) {
            even.stopPropagation()
        })

    </script>
    <script>
        var header = document.getElementById('header');
        var mobileMenu = document.getElementById('mobile-menu');
        var headerHeight = header.clientHeight;
        // open-close menu
        mobileMenu.onclick = function(){
            var isClosed = header.clientHeight === headerHeight;
            if(isClosed)
                header.style.height = 'auto';
            else
                header.style.height = null;
        }
        var menuItems = document.querySelectorAll('#nav  li  a[href*="#"]');
        for(var i of menuItems){
            i.onclick= function() {
            var isParentMenu = this.nextElementSibling && i.nextElementSibling.classList.contains('subnav');
            if(!isParentMenu)
                header.style.height = null;
            }
        }
</script>


</body>
</html>