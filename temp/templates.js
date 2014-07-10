angular.module('mngr').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('directive/primary/users.html',
    "<div ng-show=!data.user.profile><div ng-show=\"!action || action==='login'\"><h2>Login</h2><div><input type=text placeholder=email ng-model=login.email></div><div><input type=password placeholder=password ng-model=login.password></div><button ng-click=\"api.login('password', login.email, login.password);login.email='';login.password='';\">Login</button><br><a href=# ng-click=\"action='register'\">Register</a> <a href=# ng-click=\"action='recover'\">Forgot Password?</a><p>- OR -</p><button ng-click=\"api.login('facebook')\">Facebook</button> <button ng-click=\"api.login('twitter')\">Twitter</button></div><div ng-show=\"action==='register'\"><h2>Register</h2><div><input type=text placeholder=email ng-model=newAccount.email></div><div><input type=password placeholder=password ng-model=newAccount.password></div><div><input type=password placeholder=\"confirm password\" ng-model=newAccount.passwordConfirm></div><button ng-click=\"api.createAccount(newAccount.email, newAccount.password, newAccount.passwordConfirm);newAccount.email='';newAccount.password='';newAccount.passwordConfirm='';\">Register</button> <button ng-click=\"action='login'\">Cancel</button></div><div ng-show=\"action==='recover'\"><h2>Recover Password</h2><div><input type=text placeholder=email ng-model=login.email></div><button ng-click=api.recoverPassword(login.email)>Recover Password</button> <button ng-click=\"action='login'\">Cancel</button></div></div><div ng-show=data.user.profile.new><h2>Confirm Email address</h2><div ng-show=data.user.profile.name>Hello, {{data.user.profile.name}}</div><div><input type=text placeholder=email ng-model=data.user.profile.email></div><button ng-click=api.createProfile()>Complete Registration</button> <button ng-click=\"api.removeAccount(newAccount.email, newAccount.password);data.user.profile=null;newAccount.email='';newAccount.password='';newAccount.passwordConfirm='';action='login'\">Cancel</button></div><div ng-show=\"!data.user.profile.new && data.user.profile.name && data.user.profile.email\">Logged in as <strong>{{data.user.profile.name}}</strong><br><button ng-click=api.logout()>Logout</button></div><div ng-show=data.user.profile.roles><mngr-table ng-show=showTable></mngr-table><mngr-form ng-show=showForm></mngr-form><mngr-item ng-show=showItem item=showItem></mngr-item></div>"
  );


  $templateCache.put('directive/views/main.html',
    "<div class=\"col-13 row-13 absolute test\"><div class=\"col-13 row-1\" style=\"display: table\"><div class=\"col-1 row-13\"><create></create></div><div class=\"col-7 row-13\"><breadcrumb></breadcrumb></div><div class=\"col-5 row-13\"><notify></notify></div></div><div class=\"col-13 row-11\"><div ng-show=ui.workspace.overlay.show class=full><mngr element=ui.workspace.overlay.component params=ui.workspace.overlay.params workspace=overlay></mngr></div><div class=full ng-show=ui.workspace.main.show><mngr element=ui.workspace.main.component params=ui.workspace.main.params workspace=main></mngr></div><div ng-show=ui.workspace.underlay.show class=full><mngr element=ui.workspace.underlay.component params=ui.workspace.underlay.params workspace=underlay></mngr></div></div><div class=\"col-13 row-1\"><div class=\"col-6 row-13\"><omni></omni></div><div class=\"col-7 row-13\"><search></search></div></div></div>"
  );


  $templateCache.put('directive/views/mngrButton/mngrButton.html',
    "<div class=middle-container ng-click=action()><div class=\"middle-content text-center\"><h2>{{title}}</h2><p>{{content}}</p></div></div>"
  );


  $templateCache.put('directive/views/mngrContent/mngrContent.html',
    "<div></div>"
  );


  $templateCache.put('directive/views/mngrForm/mngrForm.html',
    "<div class=full><div class=\"col-2 row-2\">Cancel/Back</div><div class=\"col-7 row-2\">Heading</div><div class=\"col-4 row-2\">Submit</div><div class=\"col-3 row-10\">Form Categories</div><div class=\"col-10 row-10 scroll-y\">Form Inputs</div><div class=\"col-13 row-1\">Footer</div></div>"
  );


  $templateCache.put('directive/views/mngrInput/mngrInput.html',
    "<div><label>{{input.name}}</label><input class=col-13 ng-if=\"type === 'text' || type === 'email' || type === 'number'\" name={{name}} type={{type}} ng-model=$parent.ngModel placeholder={{placeholder}}><textarea class=col-13 ng-if=\"type==='textarea'\" name={{name}} ng-model=$parent.ngModel placeholder={{placeholder}}></textarea><select class=col-13 ng-if=\"type==='select'\" ng-model=$parent.ngModel ng-options=\"option as option for option in options\" multiple><option value=\"\">Choose {{name}}</option></select></div>"
  );


  $templateCache.put('directive/views/mngrItem/mngrItem.html',
    "<div class=full><div class=\"col-1 row-12\"><div ng-repeat=\"action in itemActions\" class=\"col-13 full\" style=height:{{100/itemActions.length}}%><div class=middle-container ng-click=action.action()><i class=\"middle-content {{action.icon}}\">{{action.name}}</i></div></div></div><span class=\"col-12 row-1\">Header</span> <span class=\"col-5 row-11\">{{item}}</span> <span class=\"col-7 row-11\">Interactions</span> <span class=\"col-13 row-1\">Footer</span></div>"
  );


  $templateCache.put('directive/views/mngrLink/mngrLink.html',
    "<a class=full ng-style=buttonStyle ng-href={{link}}>{{content}}</a>"
  );


  $templateCache.put('directive/views/mngrTable/mngrTable.html',
    "<div class=full><div ng-repeat=\"array in my.array\"><div ng-repeat=\"otherArray in my.otherArray\"><div ng-repeat=\"array2 in my.array\">{{array2 + array}}: {{api | json}}</div></div></div><div class=\"col-3 row-12\" ng-hide=hideFilters><b>Filters</b><div ng-if=\"filter.priority > 0\" ng-repeat=\"filter in table.filters\"><mngr-input class=\"full row-2\" type=filter.type name={{filter.name}} ng-model=filter.value></mngr-input><mngr-input class=\"col-13 row-2\" type=filter.type name={{filter.name}} ng-model=filter.value2 placeholder=\"{{filter.name}} (max)\" ng-if=\"filter.operand==='><' && (filter.value2||filter.value2==='')\"></mngr-input><select class=\"col-13 row-2\" ng-if=\"filter.operand && filter.operands && filter.type !== 'date' && filter.type !== 'datetimepicker'\" name={{filter.name}}-operand ng-model=filter.operand ng-options=\"operand | operandText for operand in filter.operands\"></select></div></div><div ng-hide=hideSortables class=\"col-10 row-1 middle-container\"><span class=\"middle-content text-center\" ng-repeat=\"column in table.sortables | orderBy:priority\" style=width:{{100/table.sortables.length}}% ng-click=\"column.show=!column.show\"><div ng-if=column.title>{{column.title | uppercase}}</div><div ng-if=!column.title>{{column.name | uppercase}}</div></span></div><div class=\"col-10 row-11 table-responsive\"><table class=\"table full\"><thead class=\"col-13 row-1\"><tr class=middle-container><th class=\"middle-content text-center\" ng-repeat=\"column in table.sortables | filter:{show:true} | orderBy:priority\"><a ng-click=sort.by(column.name)><span ng-if=column.title>{{column.title | uppercase}}</span> <span ng-if=!column.title>{{column.name | uppercase}}</span></a> <span ng-show=\"sort.column===column.name\"><i class=\"fa fa-fw\" ng-class=\"{'fa-sort-asc': !sort.reverse, 'fa-sort-desc': sort.reverse}\"></i></span></th><th class=\"middle-content text-center\">Remove</th></tr></thead><tbody class=\"col-13 row-11 scroll-y\" mngr-scroll-pages next-page=scroll.nextPage() prev-page=scroll.prevPage() threshold=20%><tr class=\"col-13 row-2 middle-container\" ng-repeat=\"data in table.filteredData | orderBy:sort.operator:sort.reverse | limitTo:scroll.showCount\"><td class=\"text-center middle-content\" ng-repeat=\"column in table.sortables | filter:{show:true} | orderBy:priority\" style=width:{{100/table.sortables.length}}%><h4 class=text-left><a ng-if=column.link ng-href=\"{{column.link | mngrLinkTo:data:workspace}}\"><mngr-link href=column.link data=data workspace=workspace></mngr-link><span ng-if=column.display>{{data[column.name] | mngrDisplay:column.display}}</span> <span ng-if=!column.display>{{data[column.name]}}</span></a></h4><h3 class=\"text-center middle-container\"><span ng-if=!column.link class=\"middle-content text-center\"><span ng-if=column.display class=text-left>{{data[column.name] | mngrDisplay:column.display}}</span> <span class=text-left ng-if=!column.display ng-model=data[column.name]><i ng-hide=bind class=text-center ng-click=\"bind=true\">{{column.prefix}} {{data[column.name]}}</i> <i ng-show=bind class=text-center ng-click=\"bind=true\">{{column.prefix}} <input class=text-center autofocus on-enter=\"api.save(type,data.$id); bind=!bind\" ng-model=data[column.name]> <i ng-show=bind ng-click=\"api.save(type,data.$id); bind=!bind\">Done</i></i></span></span></h3></td><td class=\"col-1 row-1 middle-content\"><b class=\"middle-content text-right\" ng-click=\"showRemove=!showRemove\" ng-hide=showRemove>[x]</b> <b class=\"middle-content text-right\" ng-show=showRemove ng-click=api.remove(type,data.$id)>[REMOVE]</b></td></tr></tbody><tfoot class=\"col-13 row-1\"><tr><th><td>Footer</td></th></tr></tfoot></table></div></div>"
  );


  $templateCache.put('directive/views/ux/breadcrumb/breadcrumb.html',
    "<div class=full><span class=\"col-1 row-13\" style=\"display: table\" ng-click=\"ui.breadcrumbs.showBreadcrumbs=!ui.breadcrumbs.showBreadcrumbs\"><i class=\"full fa fa-leaf\" style=\"text-align: center; vertical-align: middle; display: table-cell\"></i></span><h2 class=\"col-11 row-13\"><input placeholder=\" Ecossentials\" ng-model=cBreadcrumb class=\"full breadcrumbs no-pad\" ng-click=\"ui.breadcrumbs.showBreadcrumbs=!ui.breadcrumbs.showBreadcrumbs\"></h2><span class=\"col-1 row-13\" style=\"display: table\"><i class=\"full fa fa-caret-down\" style=\"text-align: center; vertical-align: middle; display: table-cell\"></i></span><div class=\"col-7 row-5 drop-1 absolute\" ng-show=ui.breadcrumbs.showBreadcrumbs><div class=full>be a yuppie</div></div></div>"
  );


  $templateCache.put('directive/views/ux/breadcrumb/breadcrumbs.html',
    "<div class=full><span class=\"col-1 row-13\" style=\"display: table\" ng-click=\"ui.breadcrumbs.showBreadcrumbs=!ui.breadcrumbs.showBreadcrumbs\"><i class=\"full fa fa-leaf\" style=\"text-align: center; vertical-align: middle; display: table-cell\"></i></span><h2 class=\"col-11 row-13\"><input placeholder=\" Ecossentials\" ng-model=cBreadcrumb class=\"full breadcrumbs no-pad\" ng-click=\"ui.breadcrumbs.showBreadcrumbs=!ui.breadcrumbs.showBreadcrumbs\"></h2><span class=\"col-1 row-13\" style=\"display: table\"><i class=\"full fa fa-caret-down\" style=\"text-align: center; vertical-align: middle; display: table-cell\"></i></span><div class=\"col-7 row-5 drop-1 absolute\" ng-show=ui.breadcrumbs.showBreadcrumbs><div class=full>be a yuppie</div></div></div>"
  );


  $templateCache.put('directive/views/ux/create/create.html',
    "<div class=full><span class=full style=\"display: table\" ng-click=\"ui.create.showOptions = !ui.create.showOptions\"><i ng-show=ui.iconography.text class=middle-container></i> <i ng-show=ui.iconography.icon class=\"full fa fa-plus middle-content\"></i> <i ng-show=ui.iconography.textIcon class=\"full fa fa-plus middle-content text-center\"></i></span><div ng-show=ui.create.showOptions class=\"absolute col-1 row-11\" style=\"display: table\"><div class=\"relative col-13\" style=\"display: table; height:{{(100/$parent.ui.create.options.length)}}%\" ng-repeat=\"specific in ui.create.options\" ng-click=\"$parent.showSpecific=!$parent.showSpecific; ui.create.specific = specific; model[specific]={}\"><i ng-show=ui.iconography.text class=full style=\"text-align: center; vertical-align: middle; display: table-cell\">{{specific | uppercase}}</i> <i ng-show=ui.iconography.icon class=\"full fa fa-plus\" style=\"text-align: center; vertical-align: middle; display: table-cell\"></i> <i ng-show=ui.iconography.textIcon class=\"full fa fa-plus\" style=\"text-align: center; vertical-align: middle; display: table-cell\">{{specific | uppercase}}</i></div><div ng-show=showSpecific class=\"push-1 col-11 row-11 fixed\"><span class=\"col-13 row-1 middle-container\"><div class=middle-content ng-init=\"model={};\"><i class=col-5>Cancel</i> <i class=col-8 ng-click=api.create(ui.create.specific,model[ui.create.specific])>Save</i></div></span><div class=\"col-13 row-12 scroll-y\"><span class=\"col-13 row-1 middle-container scroll-y\" ng-repeat=\"input in models[ui.create.specific]\"><div class=\"full middle-content\"><i class=\"col-3 text-right\">{{input.name | uppercase}} : |</i> <i class=col-8><input type={{input.type}} class=\"col-13 row-13\" ng-model=$parent.model[ui.create.specific][input.name]></i></div></span></div></div></div></div>"
  );


  $templateCache.put('directive/views/ux/notify/notify.html',
    "<div class=full><span class=full style=\"display: table\"><div class=\"full {{notification.icon}} text-center\" ng-click=\"$parent.ui.notify.showNotify=!$parent.ui.notify.showNotify; $parent.ui.notify.notification = notification.name\" style=\"text-align: center;vertical-align: middle;display: table-cell;width:{{(100/$parent.$parent.ui.notify.components.length)}}%\" ng-repeat=\"notification in $parent.ui.notify.components\"></div></span><div class=\"col-8 row-6 drop-1 absolute\" ng-if=ui.notify.showNotify><div class=full><mngr element=ui.notify.notification></mngr></div></div></div>"
  );


  $templateCache.put('directive/views/ux/omni/omni.html',
    "<div class=full><span class=full style=\"display: table\"><i class=\"full fa fa-leaf\" style=\"text-align: center; vertical-align: middle; display: table-cell\" ng-click=\"ui.omni.showOmni=!ui.omni.showOmni\">Omni</i></span><div class=\"col-6 row-6 lift-1 absolute\" ng-show=ui.omni.showOmni><div class=full><span class=\"col-4 row-13 middle-container\"><div class=\"col-13 middle-container\" style=height:{{100/3}}% ng-repeat=\"(key,workspace) in workspaces\"><i class=\"full {{workspace.icon}} middle-content\" ng-click=\"ui.search.showSearch=!ui.search.showSearch\">{{key}}</i></div></span><div class=\"col-7 row-13\"><span class=\"full middle-container\"><i class=\"full fa fa-leaf middle-content\" ng-click=\"ui.search.showSearch=!ui.search.showSearch\">Help and Policies</i></span></div><div class=\"col-2 row-13\"><div class=full><div class=col-13 style=height:{{100/components.length}}% ng-repeat=\"component in components\"><span class=\"full middle-container\"><a ng-href=/#/{{component.name}} class=\"full {{component.icon}} middle-content\" ng-click=\"ui.search.showSearch=!ui.search.showSearch\">{{component.name}}</a></span></div></div></div></div></div></div>"
  );


  $templateCache.put('directive/views/ux/search/search.html',
    "<div class=full><span class=full><h2 class=middle-container><input class=\"full fa fa-search text-center\" placeholder=Search type={{searchFilter.type}} name={{searchFilter.name}} ng-model=searchFilter.value ng-click=\"ui.search.showSearch=true\"></h2></span><div class=\"col-7 row-10 lift-1 absolute\" ng-mouseleave=\"ui.search.showSearch=false\" ng-show=ui.search.showSearch><div class=\"col-13 row-13 mngr-search\"><mngr-table></mngr-table></div><div class=\"middle-container col-2 row-1 absolute bottom right lift-1\"><b class=\"text-center middle-content\" ng-click=\"ui.search.showSearch = false\">[ Close ]</b></div></div></div>"
  );

}]);
