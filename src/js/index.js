// Import stuff
import '../styles/application.scss';

const openTab = (event) => {
  // Find tab to open
  let $targetButton = $(event.delegateTarget);
  let $targetTab = $('#' + $targetButton.attr('js-open-tab'));

  if ($targetTab.hasClass('tabcontent--active')) {
    return;
  }

  // Deselect the rest
  $('.tabs__tablink--active').removeClass('tabs__tablink--active');
  $('.tab--active').removeClass('tab--active');

  // Select clicked one
  $targetTab.addClass('tab--active');
  $targetButton.addClass('tabs__tablink--active');
}

const check = (event) => {
  // Stop propagation and prevent default in case we click on input
  event.preventDefault();
  event.stopPropagation();

  // Deselect the rest
  $('.estancia--selected').removeClass('estancia--selected').find('input[type="radio"][name="regimen"]').prop('checked', false);

  // Select clicked one
  $(event.delegateTarget).addClass('estancia--selected').find('input[type="radio"][name="regimen"]').prop('checked', true);
}

const collapse = (event) => {
  // Find collapsable
  let $targetButton = $(event.delegateTarget);
  let $targetCollapsable = $('#' + $targetButton.attr('js-collapse'));

  // Collapse
  $targetCollapsable.toggleClass('collapsable--visible');
  $targetButton.toggleClass('collapse-button--collapsed');
}

$(document).ready(() => {
  $('.estancia').click(check).first().click();

  $('.tabs__tablink').click(openTab).first().click();

  $('.collapse-button').click(collapse).first().click();
});
