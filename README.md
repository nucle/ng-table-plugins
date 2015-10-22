
Welcome to ngTablePlugins!
===================

## **Examples**

These **examples** show how to use ngTablePlugins:

Column Visibility
: Basic example 
: Exclude columns from list

## **Plugins**

### **Column Visibility**
Column visibility provides a simple and effective way to hide and show columns.

### Initialisation
Initialisation of the column visibility plugin can be performed in this way:
```
<ng-tp-column-visibility columns="ctrl.columns"></ng-tp-column-visibility>
<table data-ng-table="tableParams" data-ng-table-columns-binding="ctrl.columns" class="table ng-table-responsive">...</table>
```

### Options
|  Option                | Example                             |  Description   |            
 ----------------- | ---------------------------- |----|
| `id` |   id="employee"         | |
|`columns`| columns="ctrl.columns" | |
| `exclude`   	| exclude="{0,1}" |Array that contains the columns which you wish to exclude from the drop down view. The user has no control over the visibility of those columns.| 
| `save-state`  |save-state="true or false"| This parameter provides the ability to save the visibilty states|  
| `storage-type`| storage-type="0 or 1" | With this parameter you can choose between localStorage (=0) or sessionStorage(=1) |
