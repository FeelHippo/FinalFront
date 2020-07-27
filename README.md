# Frontendarum Conlectio.

React and Redux environment roundup.

## Getting Started

This project is hosted here: [AWS](3.23.114.112).
To install locally, clone this repo and run "npm start".
The back end is here: [Back End Repo](https://github.com/FeelHippo/FinalBack).
See dedicated repo for instructions.

## Built With

* [ReactJS](https://reactjs.org) - The one and only web framework.
* [Redux](https://redux.js.org) - Predictably, the most Predictable State Container for JS Apps.
* [Formik](https://formik.org) - Never ever use Redux-Form, please.
* [Axios](https://www.npmjs.com/package/axios) - You say "fetch", and I say "Axios".
* [i18next](https://www.i18next.com) - For all things translated.
* [SocketIO](https://socket.io) - To make chats come true.
* [Notistack](https://iamhosseindhv.com/notistack) - Sneaky Weaky Snackbars.
* [PicniCSS](https://picnicss.com) - Helped with my non existent UI design skills.

## Notes

I sincerely ask you to accept my apologies for the styling of this website.

The goal of this project is to implement in a coherent and functional way a full stack application.

I have not used PropTypes for a simple reason: Formik alone provides a solid and reliable way to accomplish the same task, wherever necessary. 

I have only used Redux where strictly necessary, and relied on the local state for UI functionalities. 

Given the simplicity of the backend, images are handled in a rather primitive way, which in turn affects performance. 

Locales were translated by hand, by myself, though I guess I should/could adapt my [dedicated npm package](https://github.com/FeelHippo/npm-translate-module) to that. 

I have not identified any major issues/bugs: authentication works decently, the content is displayed in an orderly fashion afterall, and automatic emails are sent out to notify users of changes. 

Ads can be created, changed, modified, can be marked as favorite if the user is authenticated, and can be deleted by members. 

I have created a straight forward chat, using SocketIO, that allows authenticated users to chat with each other, provided they are all authenticated, and interested in the same article. 


