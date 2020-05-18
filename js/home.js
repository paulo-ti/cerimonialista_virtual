
var $btnCasamento = document.getElementById('btnCasamento');
var $gerenciarEvento = document.getElementById('gerenciarEvento');
var $casamentoGerenciador = document.getElementById('casamentoGerenciador');
var $criarEvento = document.getElementById('criarEvento');
var url_atual = window.location.href.split('?');



$('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
    if (!$(this).next().hasClass('show')) {
      $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
    }
    var $subMenu = $(this).next(".dropdown-menu");
    $subMenu.toggleClass('show');
  
  
    $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
      $('.dropdown-submenu .show').removeClass("show");
    });

    return false;
  });

  $gerenciarEvento.addEventListener('click' , () => {
    window.history.pushState("object or string", "Title", "/gerenciador_eventos.html?"+url_atual[1]);
    document.location.reload(true);
  })

  $criarEvento.addEventListener('click' , () => {
    window.history.pushState("object or string", "Title", "/home.html?"+url_atual[1]);
    document.location.reload(true);
  })
  
  $casamentoGerenciador.addEventListener('click' , () => {
    window.history.pushState("object or string", "Title", "/casamento_gerenciador.html?"+url_atual[1]);
    document.location.reload(true);
  })