"use strict";function validateEmail(email){var emailReg=/^([\w-\.]+@([\w-]+\.)+[\w-]{1,4})?$/;if(!emailReg.test(email)){return false;}else{return true;}}
function validateContactNumber(number){var numberReg=/^((\+)?[1-9]{1,3})?([-\s\.])?((\(\d{1,4}\))|\d{1,4})(([-\s\.])?[0-9]{1,12}){1,2}$/;if(!numberReg.test(number)){return false;}else{return true;}}
function validateTextOnly(text){var textReg=/^[A-z]+$/;if(!textReg.test(text)){return false;}else{return true;}}
function validateNumberOnly(number){var numberReg=/^[0-9]+$/;if(!numberReg.test(number)){return false;}else{return true;}}
function checkElementValidation(child,type,check,error){child.parent().find('.alert').remove();if(child.val()==""&&child.attr("data-required")=="required"){child.removeClass("success");child.addClass("error");child.parent().append('<div class="alert alert-warning"><i class="fa fa-exclamation"></i>'+child.parents("form").attr("data-required")+'</div>');child.parent().find('.error-message').css("margin-left",-child.parent().find('.error-message').innerWidth()/2);return false;}else if(child.attr("data-validation")==type&&child.val()!=""){if(!check){child.removeClass("success");child.addClass("error");child.parent().append('<div class="alert alert-warning"><i class="fa fa-exclamation"></i>'+error+'</div>');child.parent().find('.error-message').css("margin-left",-child.parent().find('.error-message').innerWidth()/2);return false;}}
child.removeClass("error");child.addClass("success");return true;}
function checkFormValidation(el){var valid=true,children=el.find('input[type="text"], textarea');children.each(function(index){var child=children.eq(index);var parent=child.parents("form");if(!checkElementValidation(child,"email",validateEmail(child.val()),parent.attr("data-email"))||!checkElementValidation(child,"phone",validateContactNumber(child.val()),parent.attr("data-phone"))||!checkElementValidation(child,"text_only",validateTextOnly(child.val()),parent.attr("data-text"))||!checkElementValidation(child,"number",validateNumberOnly(child.val()),parent.attr("data-number"))){valid=false;}});return valid;}
jQuery.fn.isOnScreen=function(){var win=jQuery(window);var viewport={top:win.scrollTop(),left:win.scrollLeft()};viewport.right=viewport.left+win.width();viewport.bottom=viewport.top+win.height();var bounds=this.offset();bounds.right=bounds.left+this.outerWidth();bounds.bottom=bounds.top+this.outerHeight();return(!(viewport.right<bounds.left||viewport.left>bounds.right||viewport.bottom<bounds.top||viewport.top>bounds.bottom));};jQuery.fn.serializeObject=function()
{var o={};var a=this.serializeArray();jQuery.each(a,function(){if(o[this.name]){if(!o[this.name].push){o[this.name]=[o[this.name]];}
o[this.name].push(this.value||'');}else{o[this.name]=this.value||'';}});return o;};jQuery(function($){function topBarSize(){var el=$('.top-bar .container');el.css({'display':'none','height':'auto'}).attr('data-height',el.height()).attr('style','height: 0;').parent().removeClass('open');}
$('.top-bar .close').on('click',function(){var el=$('.top-bar');var child=$('.top-bar .container');el.toggleClass('open');if(el.hasClass('open')){child.height(child.attr('data-height'));}else{child.attr('style','height: 0;');}});topBarSize();$(window).resize(function(){topBarSize();siteNavigationSizing();});$('.megamenu > .sub-menu').addClass('container').removeClass('sub-menu').wrap('<div class="sub-menu">');$('.megamenu .container *').removeClass('sub-menu menu-item-has-children-parent menu-item-has-children');$('.megamenu .container > li:first-of-type').addClass('col-md-offset-1');$('.megamenu .container > li > a').each(function(){$(this).replaceWith($('<h4>'+$(this).html()+'</h4>'))});function siteNavigationSizing(){var el=$('.site-navigation > ul > li.menu-item-has-children, .site-navigation > ul > li.menu-item-has-children-parent');el.each(function(index){var child=el.eq(index).children(".sub-menu");child.css({'display':'none','height':'auto'});child.attr('data-height',child.height());child.attr('style','');el.addClass('menu-item-has-children-parent');el.removeClass('menu-item-has-children');});}
siteNavigationSizing()
var navInterval=""
$('.site-navigation > ul > li').hover(function(){if($('body').width()>767){var el=$(this).children(".sub-menu");el.css('height',el.attr('data-height'));navInterval=setInterval(function(){el.css("overflow","visible");clearInterval(navInterval);},300);}},function(){$(this).children(".sub-menu").attr('style','');clearInterval(navInterval);});$('.nav-wrap .fa-search').on('click',function(){$("html, body").animate({scrollTop:0},"slow");$('.site-search .container').toggleClass('open');})
$('.site-search .close').on('click',function(){$('.site-search .container').removeClass('open');;})
$('.navbar-toggle').on('click',function(){$('.site-navigation').toggleClass('open');if($('.sticky').length&&$('.site-navigation').hasClass('open')&&$(window).width()<=992){$(window).scrollTop(0);$('.sticky').addClass('unstick');$('.sticky').removeClass('sticky');}
else if(!$('.site-navigation').hasClass('open')){if($('.unstick').length){$('.unstick').addClass('sticky');$('.unstick').removeClass('unstick');}
$('.sticky-holder').height(0);}})
$('.nav-tabs a').click(function(e){e.preventDefault()
$(this).tab('show')});$('input[type="text"], textarea').on("blur",function(){var parent=$(this).parents("form");if(!checkElementValidation($(this),"email",validateEmail($(this).val()),parent.attr("data-email"))||!checkElementValidation($(this),"phone",validateContactNumber($(this).val()),parent.attr("data-phone"))||!checkElementValidation($(this),"text_only",validateTextOnly($(this).val()),parent.attr("data-text"))||!checkElementValidation($(this),"number",validateNumberOnly($(this).val()),parent.attr("data-number"))){}});$('[data-form="submit"]').on('click',function(e){$(this).parents('form.contact-form').submit();e.preventDefault();});$("form.contact-form").on("submit",function(e){if($(this).find('.newsletter-submit').length){return true;}
$(".contact-success").remove();var el=$(this);var formData=el.serializeObject();if(checkFormValidation(el)){try{$.ajax({type:"POST",url:$('#theme-path').val()+'/includes/'+'mail.php',data:{form_data:formData,}}).success(function(msg){$("form.contact-form").append('<div class="row"><div class="col-md-12"><div class="alert alert-success contact-success"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-check"></i>'+$("form.contact-form").attr("data-success")+'</div></div></div>');$(".contact-success .close").on('click',function(){$(this).parent().remove();});});}catch(e){console.log(e);}}
e.preventDefault();return false;});$('[data-form="clear"]').on('click',function(){var el=$(this).parents('form.contact-form').find('input[type="text"], textarea');el.each(function(index){el.eq(index).val("");el.eq(index).removeClass("error success");el.eq(index).parent().find(".alert").remove();});if($(this).parents('form.contact-form').next().hasClass("success")){$(this).parents('form.contact-form').next().remove();}
return false;});try{var $container=$('.isotope');if($container.length&&!$container.hasClass('.random')){var first_scroll=true;$(window).scroll(function(){if(first_scroll){$container.isotope();first_scroll=false;}});$(window).focus(function(){$container.isotope();});$container.isotope({itemSelector:'.isotope li',layoutMode:'fitRows',animationOptions:{duration:750,queue:false,}});$('.filter button').on('click',function(){$('.filter button').removeClass('selected');$(this).addClass("selected");var item="";if($(this).attr('data-filter')!='*'){item=".";}
item+=$(this).attr('data-filter');$container.isotope({filter:item});});$(window).resize(function(){if($('.filter').length){var item="";if($('.filter button.selected').attr('data-filter')!='*'){item=".";}
item+=$('.filter button.selected').attr('data-filter');$container.isotope({filter:item});}
$(".isotope").isotope('layout');});$(document).ready(function(){$(window).load(function(){$(".isotope").isotope('layout');});});}}catch(e){}
try{var $containerRandom=$('.isotope.random');if($containerRandom.length){var first_scroll=true;$(window).scroll(function(){if(first_scroll){$containerRandom.isotope();first_scroll=false;}});$(window).focus(function(){$containerRandom.isotope();});$containerRandom.isotope({itemSelector:'.isotope li',layoutMode:'masonry',masonry:{columnWidth:292}});$('.filter button').on('click',function(){$('.filter button').removeClass('selected');$(this).addClass("selected");var item="";if($(this).attr('data-filter')!='*'){item=".";}
item+=$(this).attr('data-filter');$containerRandom.isotope({filter:item});});$(window).resize(function(){var item="";if($('.filter button.selected').attr('data-filter')!='*'){item=".";}
item+=$('.filter button.selected').attr('data-filter');$containerRandom.isotope({filter:item});$(".isotope").isotope('layout');if($('.col-md-12').width()==940){console.log(111);$containerRandom.isotope({masonry:{columnWidth:292},layoutMode:'masonry',});}else if($('section.container').width()==1140){$containerRandom.isotope({masonry:{columnWidth:292},layoutMode:'masonry',});}else if($('section.container').width()==740){$containerRandom.isotope({layoutMode:'fitRows',});}else{$containerRandom.isotope({layoutMode:'fitRows',});}});if($('section.container').width()==940){console.log(111);$containerRandom.isotope({masonry:{columnWidth:292},layoutMode:'masonry',});}else if($('section.container').width()==1140){$containerRandom.isotope({masonry:{columnWidth:292},layoutMode:'masonry',});}else if($('section.container').width()==740){$containerRandom.isotope({layoutMode:'fitRows',});}
else{$containerRandom.isotope({layoutMode:'fitRows',});}
$(document).ready(function(){$(window).load(function(){$(".isotope").isotope('layout');});});}}catch(e){}
try{var $containerMasonry=$('.blog-masonry');$containerMasonry.imagesLoaded(function(){if($containerMasonry.length){$containerMasonry.isotope({itemSelector:'.blog-masonry .post',animationOptions:{duration:750,queue:false,}});$(window).resize(function(){$containerMasonry.isotope('layout');});$(window).focus(function(){$containerMasonry.isotope('layout');});$(document).ready(function(){$(window).load(function(){$containerMasonry.isotope('layout');});});}});}catch(e){}
try{$("[data-twitter]").each(function(index){var el=$("[data-twitter]").eq(index);$.ajax({type:"POST",url:'http://localhost:8004/assets/php/twitter.php',data:{account:el.attr("data-twitter")},success:function(msg){el.find(".carousel-inner").html(msg);}});});}catch(e){}
function checkForOnScreen(){$('.counter-number').each(function(index){if(!$(this).hasClass('animated')&&$('.counter-number').eq(index).isOnScreen()){$('.counter-number').eq(index).countTo({speed:5000});$('.counter-number').eq(index).addClass('animated');}});}
checkForOnScreen();$(window).scroll(function(){checkForOnScreen();});$('.fullscreen').css('height',$(window).height()+'px');$('.site-navigation a[href*="#"]:not([href="#"]):not([href*="="])').click(function(){if(location.pathname.replace(/^\//,'')==this.pathname.replace(/^\//,'')||location.hostname==this.hostname){var target=$(this.hash);var href=$.attr(this,'href');target=target.length?target:$('[name='+this.hash.slice(1)+']');if(target.length){$('html,body').animate({scrollTop:target.offset().top},1000,function(){window.location.hash=href;});return false;}}});var navLinkIDs="";$('.site-navigation a[href*="#"]:not([href="#"]):not([href*="="])').each(function(index){if(navLinkIDs!=""){navLinkIDs+=", ";}
navLinkIDs+='#'+$('.site-navigation a[href*="#"]:not([href="#"]):not([href*="="])').eq(index).attr("href").split('#')[1];});if(navLinkIDs){$(navLinkIDs).waypoint(function(direction){if(direction=='down'){$('.site-navigation a').parent().removeClass("current_page_item");$('.site-navigation a[href="#'+$(this).attr('id')+'"]').parent().addClass("current_page_item");}},{offset:125});$(navLinkIDs).waypoint(function(direction){if(direction=='up'){$('.site-navigation a').parent().removeClass("current_page_item");$('.site-navigation a[href="#'+$(this).attr('id')+'"]').parent().addClass("current_page_item");}},{offset:function(){return-$(this).height()+20;}});}
var sticky=$('.nav-wrap');var isFullScreenAdded=$('.fullscreen').length;if(isFullScreenAdded){var fullScreenHeight=$('.fullscreen').height();$(window).scroll(function(){if($(window).scrollTop()>fullScreenHeight){if(!sticky.hasClass('active')){sticky.addClass('active');}}else{sticky.removeClass('active');}});}else{var barHeight=$('.site-search').height()+$('.top-bar').height();$(window).scroll(function(){if($(window).scrollTop()>barHeight){sticky.addClass('active');}else{sticky.removeClass('active');}});}
$('button[data-form="clear"]').on('click',function(){$('textarea, input[type="text"]').val('');});$('button[data-form="submit"]').on('click',function(){$('.form-submit #submit').click();});$('.searchform input[type="submit"], .widget_product_search input[type="submit"]').remove();$('.searchform div').append('<button type="submit" class="fa fa-search" id="searchsubmit" value=""></button>');$('.widget_product_search .woocommerce-product-search').append('<button type="submit" class="fa fa-search" id="searchsubmit" value=""></button>');$('.searchform input[type="text"]').attr('placeholder',anps.search_placeholder);$('.blog-masonry').parent().removeClass('col-md-12');$('.post.style-3').parent().parent().removeClass('col-md-12').parent().removeClass('col-md-12');$("a[rel^='prettyPhoto']").prettyPhoto();$('#menu-main-menu').doubleTapToGo();$('.tnp-email').attr('placeholder',$('.tnp-field label').text());$('.tnp-field-button').on('click',function(e){if(e.target.nodeName=='DIV'){$(this).find('.tnp-button').click();}});$(window).on('load',function(){if(window.location.hash.length>0){setTimeout(function(){window.scrollTo(0,$(window.location.hash).offset().top);},1);}});$('.show-register').on('click',function(){$('#customer_login h3, #customer_login .show-register').addClass('hidden');$('#customer_login .register').removeClass('hidden');});});