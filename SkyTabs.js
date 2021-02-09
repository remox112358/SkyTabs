/**
 * SkyTabs 0.1.3
 * https://github.com/remox112358/SkyTabs.git
 * 
 * Copyright (c) 2021 Artyom Davtyan (https://github.com/remox112358)
 * 
 * Licensed under the terms of the MIT License
 */



const SkyTabs = () => {

    /**
     * All tabs DOM elements.
     */
    const tabs = document.querySelectorAll('[data-st-role="tab"]');

    /**
     * Initialization start.
     */
    this.init = () => {

        initStyles();
        addEventForTabs(tabs);

    }

    /**
     * Adding functionality to tabs click event.
     * 
     * @param {array} tabs - Array of tabs DOM elements 
     */
    this.addEventForTabs = (tabs) => {

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                let area = document.querySelector(`${tab.getAttribute('data-st-href')}`),
                    tabSiblings = utils.getSiblings(tab),
                    areaSiblings = utils.getSiblings(area);

                utils.removeElementsClass(tabSiblings, 'active');
                utils.removeElementsClass(areaSiblings, 'active');

                utils.addClass(tab, 'active');
                utils.addClass(area, 'active');
            });
        });

    }

    /**
     * Declare css styles.
     */
    this.initStyles = () => {

        var style = document.createElement('style');

        style.innerHTML = `
            [data-st-role="area"]:not(.active) {
                display: none !important;
            }

            [data-st-role="area"].active {
                display: inherit;
            }
        `;

        document.getElementsByTagName('head')[0].appendChild(style);

    }

    /**
     * Automatically script initialization.
     */
    init();
    
}

/**
 * Load script after window load.
 */
window.addEventListener('load', SkyTabs);

/**
 * Auxillary functions.
 */
const utils = {

    /**
     * Getting DOM element siblings.
     * 
     * @param {object} element - Target DOM element
     * @returns {array} - Siblings array
     */
    getSiblings: (element) => {

        let siblings = [],
            sibling  = element.parentNode.firstChild;
        
        while (sibling) {
            if (sibling.nodeType === 1 && sibling !== element) {
                siblings.push(sibling);
            }

            sibling = sibling.nextSibling;
        }

        return siblings;

    },

    /**
     * Removing html classname from each element in array.
     * 
     * @param {array} elements - Array of target DOM elements
     * @param {string} className - Received classname
     * @returns {void} - Nothing
     */
    removeElementsClass: (elements, className) => {

        elements.forEach(element => {
            element.classList.remove(className);
        });

    },

    /**
     * Adding html classname to target DOM element.
     * 
     * @param {object} element - Target DOM element 
     * @param {string} className - Received classname
     */
    addClass: (element, className) => {

        element.classList.add(className);

    }

}