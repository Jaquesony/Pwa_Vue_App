"use strict";

require("primevue/resources/primevue.min.css");

require("primevue/resources/themes/lara-light-blue/theme.css");

require("primeflex/primeflex.css");

require("primeicons/primeicons.css");

require("./assets/styles/layout.scss");

require("./assets/demo/flags/flags.css");

var _vue = require("vue");

var _vueAxios = _interopRequireDefault(require("vue-axios"));

require("./registerServiceWorker");

var _http = _interopRequireDefault(require("./http"));

var _router = _interopRequireDefault(require("./router"));

var _AppWrapper = _interopRequireDefault(require("./AppWrapper.vue"));

var _config = _interopRequireDefault(require("primevue/config"));

var _autocomplete = _interopRequireDefault(require("primevue/autocomplete"));

var _accordion = _interopRequireDefault(require("primevue/accordion"));

var _accordiontab = _interopRequireDefault(require("primevue/accordiontab"));

var _avatar = _interopRequireDefault(require("primevue/avatar"));

var _avatargroup = _interopRequireDefault(require("primevue/avatargroup"));

var _badge = _interopRequireDefault(require("primevue/badge"));

var _badgedirective = _interopRequireDefault(require("primevue/badgedirective"));

var _button = _interopRequireDefault(require("primevue/button"));

var _breadcrumb = _interopRequireDefault(require("primevue/breadcrumb"));

var _calendar = _interopRequireDefault(require("primevue/calendar"));

var _card = _interopRequireDefault(require("primevue/card"));

var _carousel = _interopRequireDefault(require("primevue/carousel"));

var _chart = _interopRequireDefault(require("primevue/chart"));

var _checkbox = _interopRequireDefault(require("primevue/checkbox"));

var _chip = _interopRequireDefault(require("primevue/chip"));

var _chips = _interopRequireDefault(require("primevue/chips"));

var _colorpicker = _interopRequireDefault(require("primevue/colorpicker"));

var _column = _interopRequireDefault(require("primevue/column"));

var _confirmdialog = _interopRequireDefault(require("primevue/confirmdialog"));

var _confirmpopup = _interopRequireDefault(require("primevue/confirmpopup"));

var _confirmationservice = _interopRequireDefault(require("primevue/confirmationservice"));

var _contextmenu = _interopRequireDefault(require("primevue/contextmenu"));

var _datatable = _interopRequireDefault(require("primevue/datatable"));

var _dataview = _interopRequireDefault(require("primevue/dataview"));

var _dataviewlayoutoptions = _interopRequireDefault(require("primevue/dataviewlayoutoptions"));

var _dialog = _interopRequireDefault(require("primevue/dialog"));

var _divider = _interopRequireDefault(require("primevue/divider"));

var _dropdown = _interopRequireDefault(require("primevue/dropdown"));

var _fieldset = _interopRequireDefault(require("primevue/fieldset"));

var _fileupload = _interopRequireDefault(require("primevue/fileupload"));

var _image = _interopRequireDefault(require("primevue/image"));

var _inlinemessage = _interopRequireDefault(require("primevue/inlinemessage"));

var _inplace = _interopRequireDefault(require("primevue/inplace"));

var _inputmask = _interopRequireDefault(require("primevue/inputmask"));

var _inputnumber = _interopRequireDefault(require("primevue/inputnumber"));

var _inputswitch = _interopRequireDefault(require("primevue/inputswitch"));

var _inputtext = _interopRequireDefault(require("primevue/inputtext"));

var _knob = _interopRequireDefault(require("primevue/knob"));

var _galleria = _interopRequireDefault(require("primevue/galleria"));

var _listbox = _interopRequireDefault(require("primevue/listbox"));

var _megamenu = _interopRequireDefault(require("primevue/megamenu"));

var _menu = _interopRequireDefault(require("primevue/menu"));

var _menubar = _interopRequireDefault(require("primevue/menubar"));

var _message = _interopRequireDefault(require("primevue/message"));

var _multiselect = _interopRequireDefault(require("primevue/multiselect"));

var _orderlist = _interopRequireDefault(require("primevue/orderlist"));

var _organizationchart = _interopRequireDefault(require("primevue/organizationchart"));

var _overlaypanel = _interopRequireDefault(require("primevue/overlaypanel"));

var _paginator = _interopRequireDefault(require("primevue/paginator"));

var _panel = _interopRequireDefault(require("primevue/panel"));

var _panelmenu = _interopRequireDefault(require("primevue/panelmenu"));

var _password = _interopRequireDefault(require("primevue/password"));

var _picklist = _interopRequireDefault(require("primevue/picklist"));

var _progressbar = _interopRequireDefault(require("primevue/progressbar"));

var _rating = _interopRequireDefault(require("primevue/rating"));

var _radiobutton = _interopRequireDefault(require("primevue/radiobutton"));

var _ripple = _interopRequireDefault(require("primevue/ripple"));

var _selectbutton = _interopRequireDefault(require("primevue/selectbutton"));

var _scrollpanel = _interopRequireDefault(require("primevue/scrollpanel"));

var _scrolltop = _interopRequireDefault(require("primevue/scrolltop"));

var _slider = _interopRequireDefault(require("primevue/slider"));

var _sidebar = _interopRequireDefault(require("primevue/sidebar"));

var _skeleton = _interopRequireDefault(require("primevue/skeleton"));

var _splitbutton = _interopRequireDefault(require("primevue/splitbutton"));

var _splitter = _interopRequireDefault(require("primevue/splitter"));

var _splitterpanel = _interopRequireDefault(require("primevue/splitterpanel"));

var _steps = _interopRequireDefault(require("primevue/steps"));

var _styleclass = _interopRequireDefault(require("primevue/styleclass"));

var _tabmenu = _interopRequireDefault(require("primevue/tabmenu"));

var _tag = _interopRequireDefault(require("primevue/tag"));

var _tieredmenu = _interopRequireDefault(require("primevue/tieredmenu"));

var _textarea = _interopRequireDefault(require("primevue/textarea"));

var _timeline = _interopRequireDefault(require("primevue/timeline"));

var _toast = _interopRequireDefault(require("primevue/toast"));

var _toastservice = _interopRequireDefault(require("primevue/toastservice"));

var _toolbar = _interopRequireDefault(require("primevue/toolbar"));

var _tabview = _interopRequireDefault(require("primevue/tabview"));

var _tabpanel = _interopRequireDefault(require("primevue/tabpanel"));

var _tooltip = _interopRequireDefault(require("primevue/tooltip"));

var _togglebutton = _interopRequireDefault(require("primevue/togglebutton"));

var _tree = _interopRequireDefault(require("primevue/tree"));

var _treeselect = _interopRequireDefault(require("primevue/treeselect"));

var _treetable = _interopRequireDefault(require("primevue/treetable"));

var _tristatecheckbox = _interopRequireDefault(require("primevue/tristatecheckbox"));

var _AppCodeHighlight = _interopRequireDefault(require("./AppCodeHighlight"));

var _BlockViewer = _interopRequireDefault(require("./BlockViewer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import "primevue/resources/themes/tailwind-light/theme.css";
// import "primevue/resources/themes/bootstrap4-dark-purple/theme.css";
// import "prismjs/themes/prism-coy.css";
_router["default"].beforeEach(function (to, from, next) {
  window.scrollTo(0, 0);
  next();
});

var app = (0, _vue.createApp)(_AppWrapper["default"]);
app.config.globalProperties.$appState = (0, _vue.reactive)({
  theme: "lara-light-indigo",
  darkTheme: false
});
app.use(_config["default"], {
  ripple: true,
  inputStyle: "outlined"
});
app.use(_vueAxios["default"], _http["default"]);
app.use(_confirmationservice["default"]);
app.use(_toastservice["default"]);
app.use(_router["default"]);
app.directive("tooltip", _tooltip["default"]);
app.directive("ripple", _ripple["default"]);
app.directive("code", _AppCodeHighlight["default"]);
app.directive("badge", _badgedirective["default"]);
app.directive("styleclass", _styleclass["default"]);
app.component("Accordion", _accordion["default"]);
app.component("AccordionTab", _accordiontab["default"]);
app.component("AutoComplete", _autocomplete["default"]);
app.component("Avatar", _avatar["default"]);
app.component("AvatarGroup", _avatargroup["default"]);
app.component("Badge", _badge["default"]);
app.component("Breadcrumb", _breadcrumb["default"]);
app.component("Button", _button["default"]);
app.component("Calendar", _calendar["default"]);
app.component("Card", _card["default"]);
app.component("Carousel", _carousel["default"]);
app.component("Chart", _chart["default"]);
app.component("Checkbox", _checkbox["default"]);
app.component("Chip", _chip["default"]);
app.component("Chips", _chips["default"]);
app.component("ColorPicker", _colorpicker["default"]);
app.component("Column", _column["default"]);
app.component("ConfirmDialog", _confirmdialog["default"]);
app.component("ConfirmPopup", _confirmpopup["default"]);
app.component("ContextMenu", _contextmenu["default"]);
app.component("DataTable", _datatable["default"]);
app.component("DataView", _dataview["default"]);
app.component("DataViewLayoutOptions", _dataviewlayoutoptions["default"]);
app.component("Dialog", _dialog["default"]);
app.component("Divider", _divider["default"]);
app.component("Dropdown", _dropdown["default"]);
app.component("Fieldset", _fieldset["default"]);
app.component("FileUpload", _fileupload["default"]);
app.component("Image", _image["default"]);
app.component("InlineMessage", _inlinemessage["default"]);
app.component("Inplace", _inplace["default"]);
app.component("InputMask", _inputmask["default"]);
app.component("InputNumber", _inputnumber["default"]);
app.component("InputSwitch", _inputswitch["default"]);
app.component("InputText", _inputtext["default"]);
app.component("Galleria", _galleria["default"]);
app.component("Knob", _knob["default"]);
app.component("Listbox", _listbox["default"]);
app.component("MegaMenu", _megamenu["default"]);
app.component("Menu", _menu["default"]);
app.component("Menubar", _menubar["default"]);
app.component("Message", _message["default"]);
app.component("MultiSelect", _multiselect["default"]);
app.component("OrderList", _orderlist["default"]);
app.component("OrganizationChart", _organizationchart["default"]);
app.component("OverlayPanel", _overlaypanel["default"]);
app.component("Paginator", _paginator["default"]);
app.component("Panel", _panel["default"]);
app.component("PanelMenu", _panelmenu["default"]);
app.component("Password", _password["default"]);
app.component("PickList", _picklist["default"]);
app.component("ProgressBar", _progressbar["default"]);
app.component("RadioButton", _radiobutton["default"]);
app.component("Rating", _rating["default"]);
app.component("SelectButton", _selectbutton["default"]);
app.component("ScrollPanel", _scrollpanel["default"]);
app.component("ScrollTop", _scrolltop["default"]);
app.component("Slider", _slider["default"]);
app.component("Sidebar", _sidebar["default"]);
app.component("Skeleton", _skeleton["default"]);
app.component("SplitButton", _splitbutton["default"]);
app.component("Splitter", _splitter["default"]);
app.component("SplitterPanel", _splitterpanel["default"]);
app.component("Steps", _steps["default"]);
app.component("TabMenu", _tabmenu["default"]);
app.component("TabView", _tabview["default"]);
app.component("TabPanel", _tabpanel["default"]);
app.component("Tag", _tag["default"]);
app.component("Textarea", _textarea["default"]);
app.component("TieredMenu", _tieredmenu["default"]);
app.component("Timeline", _timeline["default"]);
app.component("Toast", _toast["default"]);
app.component("Toolbar", _toolbar["default"]);
app.component("ToggleButton", _togglebutton["default"]);
app.component("Tree", _tree["default"]);
app.component("TreeSelect", _treeselect["default"]);
app.component("TreeTable", _treetable["default"]);
app.component("TriStateCheckbox", _tristatecheckbox["default"]);
app.component("BlockViewer", _BlockViewer["default"]);
app.mount("#app");