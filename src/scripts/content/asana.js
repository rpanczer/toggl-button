'use strict';

// Old task view
togglbutton.render(
  '.BoardColumnCardsContainer-item:not(.toggl)',
  { observe: true },
  function (elem) {
    if ($('.toggl-button', elem)) {
      return;
    }
    const container = $('.BoardCardWithCustomProperties-assigneeAndDueDate', elem);
    const description = $('.BoardCardWithCustomProperties-name', elem).textContent;
    const project = $('.SidebarItemRow.is-selected').textContent;

    const link = togglbutton.createTimerLink({
      className: 'asana-board',
      description: description,
      projectName: project,
      buttonType: 'minimal'
    });

    container.appendChild(link);
  }
);

// New task view
togglbutton.render('.MyTasksTaskRow:not(.toggl)', { observe: true },
  function (elem) {
    const container = elem.querySelector('.ItemRowTwoColumnStructure-left');
    const description = elem.querySelector('.TaskName textarea').textContent;

    const projectSelector = () => {
      const projectElement = elem.querySelector('.TaskRow-pots .Pill');

      return projectElement ? projectElement.textContent : '';
    };

    const link = togglbutton.createTimerLink({
      className: 'asana-new-ui',
      description: description,
      projectName: projectSelector,
      buttonType: 'minimal'
    });

    container.appendChild(link);
  }
);

// Old and Beta UI - detail view
togglbutton.render(
  '.SingleTaskPane-titleRow:not(.toggl)',
  { observe: true },
  function (elem) {
    if ($('.toggl-button', elem)) {
      return;
    }
    const container = $('.SingleTaskPaneToolbar');

    const descriptionSelector = () => {
      return $(
        '.SingleTaskPane-titleRow .simpleTextarea',
        elem.parentNode
      ).textContent;
    };

    const projectSelector = () => {
      const projectElement = $(
        '.SingleTaskPane-projects .TaskProjectPill-projectName',
        elem.parentNode
      );

      return projectElement ? projectElement.textContent : '';
    };

    const link = togglbutton.createTimerLink({
      className: 'asana-board',
      description: descriptionSelector,
      projectName: projectSelector,
      buttonType: 'minimal'
    });

    link.style.marginRight = '5px';

    if (container) {
      const closeButton = container.lastElementChild;
      container.insertBefore(link, closeButton);
    }
  }
);
