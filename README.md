# MNGR
![alt text](https://lh5.googleusercontent.com/CSNN23iyh6lXba1YoTqFwnLMTGd8TPRadVpRBng1c9s=w723-h844-no "MNGR, Crossing the finishline with you.")
## States
====
### 1. Authenticated
  * Customer
  * Employee
  * Manager
  * Admin
### 2. Workspaces
  * Overlay
  * Underlay
  * left
  * middle
  * right
  * alert

## 3. Directory Structure
====
* ### Directive
  * #### primary
    * contents
    * orders
    * shop
    * stock
    * users
  * #### support
    * messages
    * events
    * notes
    * notices
  * #### views
    * ##### mngrTable
    * ##### mngrItem
    * ##### mngrForm
    * ##### breadcrumb
    * ##### create
    * ##### notify
    * ##### omni
    * ##### search
    * main
  * mngr
* ### service
  * api
  * data
  * models
  * ui
* app.js
* index.html

## Basic App Pattern
====


Primary and support directives scope data from services to display on the view directives:
  * **mngrItem** - Takes a single object and single item model
  * **mngrTable** - Takes a list of objects and table model
  * **mngrForm** - Takes a model and modifies/creates an object
  
  
## Linking
====
Links are created by directives or system-based functions like signing in. Each link could have:
  * workspaces
  * directives
  * specific item


Created with Angular JS and Firebase, courtesy of Yo! cg-angular
  