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

## Directory Structure
====
* **Directive**
  * **primary**
    * contents
    * orders
    * shop
    * stock
    * users
  * **support**
    * messages
    * events
    * notes
    * notices
  * **views**
    * mngrTable
    * mngrItem
    * mngrForm
    * breadcrumb
    * create
    * notify
    * omni
    * search
    * main
  * mngr
* **service**
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
  
  ### Development Pattern (suggested)
  ** 1. HTML with dummy data
  ** 2. HTML with ng-init data
  ** 3. HTML with view $scope'd data
  ** 4. HTML with directive $scope'd data
  ** 5. HTML with directive $scope'd data from a model service
  ** 6. HTML with directive $scope'd from a data service
  
## Linking
====
Links are created by directives or system-based functions like signing in. Each link could have:
  * workspaces
  * directives
  * specific item
  
## Design Guide

### Grid and positioning
  * 13 columns: .col-1 - .col-13
  * 13 rows: .row-1 - .row-13
  * 13 push, 13 pull (left/right): .push-1 - .pull-13
  * 13 lift, 13 drop (up/down): .lift-1 - .drop-13
  * Full height and width: .full
  
  
  * Absolute positioning: .absolute, relative positioning: .relative, fixed positioning: .fixed
  * Top: .top, Bottom: .bottom, Left: .left, Right: .right  
  * Absolute centering: .middle-container (holds the) .middle-content
  * Padding: .pad, No padding: .no-pad
  
  * Overflow control: .scroll-y, .scroll-x, .all-scroll, .no-scroll
  
  
  

Created with Angular JS, Firebase, and Font Awesome. 
Courtesy of Yo! generator: cg-angular 
  