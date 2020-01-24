/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, forwardRef, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CountryCode } from './data/country-code';
import { phoneNumberValidator } from './ngx-intl-tel-input.validator';
import * as lpn from 'google-libphonenumber';
import { SearchCountryField } from './enums/search-country-field.enum';
import { TooltipLabel } from './enums/tooltip-label.enum';
import { CountryISO } from './enums/country-iso.enum';
var ɵ0 = phoneNumberValidator;
var NgxIntlTelInputComponent = /** @class */ (function () {
    function NgxIntlTelInputComponent(countryCodeData) {
        this.countryCodeData = countryCodeData;
        this.value = '';
        this.preferredCountries = [];
        this.enablePlaceholder = true;
        this.cssClass = 'form-control';
        this.onlyCountries = [];
        this.enableAutoCountrySelect = true;
        this.searchCountryFlag = false;
        this.searchCountryField = [SearchCountryField.All];
        this.searchCountryPlaceholder = 'Search Country';
        this.maxLength = '';
        this.selectFirstCountry = true;
        this.phoneValidation = true;
        this.countryChange = new EventEmitter();
        this.selectedCountry = {
            areaCodes: undefined,
            dialCode: '',
            flagClass: '',
            iso2: '',
            name: '',
            placeHolder: '',
            priority: 0
        };
        // display the country dial code next to the selected flag
        this.separateDialCode = false;
        this.phoneNumber = '';
        this.allCountries = [];
        this.preferredCountriesInDropDown = [];
        // Has to be 'any' to prevent a need to install @types/google-libphonenumber by the package user...
        this.phoneUtil = lpn.PhoneNumberUtil.getInstance();
        this.disabled = false;
        this.errors = ['Phone number is required.'];
        this.countrySearchText = '';
        this.onTouched = (/**
         * @return {?}
         */
        function () { });
        this.propagateChange = (/**
         * @param {?} _
         * @return {?}
         */
        function (_) { });
    }
    /**
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.fetchCountryData();
        if (this.preferredCountries.length) {
            this.getPreferredCountries();
        }
        if (this.onlyCountries.length) {
            this.allCountries = this.allCountries.filter((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return _this.onlyCountries.includes(c.iso2); }));
        }
        if (this.selectFirstCountry) {
            if (this.preferredCountriesInDropDown.length) {
                this.setSelectedCountry(this.preferredCountriesInDropDown[0]);
            }
            else {
                this.setSelectedCountry(this.allCountries[0]);
            }
        }
        this.getSelectedCountry();
        this.checkSeparateDialCodeStyle();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (this.allCountries && changes['selectedCountryISO']
            && changes['selectedCountryISO'].currentValue !== changes['selectedCountryISO'].previousValue) {
            this.getSelectedCountry();
        }
        if (changes.preferredCountries) {
            this.getPreferredCountries();
        }
        this.checkSeparateDialCodeStyle();
    };
    /**
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.getPreferredCountries = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.preferredCountries.length) {
            this.preferredCountriesInDropDown = [];
            this.preferredCountries.forEach((/**
             * @param {?} iso2
             * @return {?}
             */
            function (iso2) {
                /** @type {?} */
                var preferredCountry = _this.allCountries.filter((/**
                 * @param {?} c
                 * @return {?}
                 */
                function (c) {
                    return c.iso2 === iso2;
                }));
                _this.preferredCountriesInDropDown.push(preferredCountry[0]);
            }));
        }
    };
    /**
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.getSelectedCountry = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.selectedCountryISO) {
            this.selectedCountry = this.allCountries.find((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return (c.iso2.toLowerCase() === _this.selectedCountryISO.toLowerCase()); }));
            if (this.selectedCountry) {
                if (this.phoneNumber) {
                    this.onPhoneNumberChange();
                }
                else {
                    this.propagateChange(undefined);
                }
            }
        }
    };
    /**
     * @param {?} country
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.setSelectedCountry = /**
     * @param {?} country
     * @return {?}
     */
    function (country) {
        this.selectedCountry = country;
        this.countryChange.emit(country);
    };
    /**
     * Search country based on country name, iso2, dialCode or all of them.
     */
    /**
     * Search country based on country name, iso2, dialCode or all of them.
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.searchCountry = /**
     * Search country based on country name, iso2, dialCode or all of them.
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.countrySearchText) {
            this.countryList.nativeElement.querySelector('li').scrollIntoView({ behavior: 'smooth' });
            return;
        }
        /** @type {?} */
        var countrySearchTextLower = this.countrySearchText.toLowerCase();
        /** @type {?} */
        var country = this.allCountries.filter((/**
         * @param {?} c
         * @return {?}
         */
        function (c) {
            if (_this.searchCountryField.indexOf(SearchCountryField.All) > -1) {
                // Search in all fields
                if (c.iso2.toLowerCase().startsWith(countrySearchTextLower)) {
                    return c;
                }
                if (c.name.toLowerCase().startsWith(countrySearchTextLower)) {
                    return c;
                }
                if (c.dialCode.startsWith(_this.countrySearchText)) {
                    return c;
                }
            }
            else {
                // Or search by specific SearchCountryField(s)
                if (_this.searchCountryField.indexOf(SearchCountryField.Iso2) > -1) {
                    if (c.iso2.toLowerCase().startsWith(countrySearchTextLower)) {
                        return c;
                    }
                }
                if (_this.searchCountryField.indexOf(SearchCountryField.Name) > -1) {
                    if (c.name.toLowerCase().startsWith(countrySearchTextLower)) {
                        return c;
                    }
                }
                if (_this.searchCountryField.indexOf(SearchCountryField.DialCode) > -1) {
                    if (c.dialCode.startsWith(_this.countrySearchText)) {
                        return c;
                    }
                }
            }
        }));
        if (country.length > 0) {
            /** @type {?} */
            var el = this.countryList.nativeElement.querySelector('#' + country[0].iso2);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        }
        this.checkSeparateDialCodeStyle();
    };
    /**
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.onPhoneNumberChange = /**
     * @return {?}
     */
    function () {
        this.value = this.phoneNumber;
        /** @type {?} */
        var number;
        try {
            number = this.phoneUtil.parse(this.phoneNumber, this.selectedCountry.iso2.toUpperCase());
        }
        catch (e) {
        }
        /** @type {?} */
        var countryCode = this.selectedCountry.iso2;
        // auto select country based on the extension (and areaCode if needed) (e.g select Canada if number starts with +1 416)
        if (this.enableAutoCountrySelect) {
            countryCode = number && number.getCountryCode()
                ? this.getCountryIsoCode(number.getCountryCode(), number)
                : this.selectedCountry.iso2;
            if (countryCode && countryCode !== this.selectedCountry.iso2) {
                /** @type {?} */
                var newCountry = this.allCountries.find((/**
                 * @param {?} c
                 * @return {?}
                 */
                function (c) { return c.iso2 === countryCode; }));
                if (newCountry) {
                    this.selectedCountry = newCountry;
                }
            }
        }
        countryCode = countryCode ? countryCode : this.selectedCountry.iso2;
        this.checkSeparateDialCodeStyle();
        if (!this.value) {
            // tslint:disable-next-line:no-null-keyword
            this.propagateChange(null);
        }
        else {
            /** @type {?} */
            var intlNo = number ? this.phoneUtil.format(number, lpn.PhoneNumberFormat.INTERNATIONAL) : '';
            // parse phoneNumber if separate dial code is needed
            if (this.separateDialCode && intlNo) {
                this.phoneNumber = this.removeDialCode(intlNo);
            }
            this.propagateChange({
                number: this.value,
                internationalNumber: intlNo,
                nationalNumber: number ? this.phoneUtil.format(number, lpn.PhoneNumberFormat.NATIONAL) : '',
                countryCode: countryCode.toUpperCase(),
                dialCode: '+' + this.selectedCountry.dialCode
            });
        }
    };
    /**
     * @param {?} country
     * @param {?} el
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.onCountrySelect = /**
     * @param {?} country
     * @param {?} el
     * @return {?}
     */
    function (country, el) {
        this.setSelectedCountry(country);
        this.checkSeparateDialCodeStyle();
        if (this.phoneNumber != null && this.phoneNumber.length > 0) {
            this.value = this.phoneNumber;
            /** @type {?} */
            var number = void 0;
            try {
                number = this.phoneUtil.parse(this.phoneNumber, this.selectedCountry.iso2.toUpperCase());
            }
            catch (e) {
            }
            /** @type {?} */
            var intlNo = number ? this.phoneUtil.format(number, lpn.PhoneNumberFormat.INTERNATIONAL) : '';
            // parse phoneNumber if separate dial code is needed
            if (this.separateDialCode && intlNo) {
                this.phoneNumber = this.removeDialCode(intlNo);
            }
            this.propagateChange({
                number: this.value,
                internationalNumber: intlNo,
                nationalNumber: number ? this.phoneUtil.format(number, lpn.PhoneNumberFormat.NATIONAL) : '',
                countryCode: this.selectedCountry.iso2.toUpperCase(),
                dialCode: '+' + this.selectedCountry.dialCode
            });
        }
        else {
            this.propagateChange(null);
        }
        el.focus();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.onInputKeyPress = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var allowedChars = /[0-9\+\-\ ]/;
        /** @type {?} */
        var allowedCtrlChars = /[axcv]/;
        // Allows copy-pasting
        /** @type {?} */
        var allowedOtherKeys = [
            'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown',
            'Home', 'End', 'Insert', 'Delete', 'Backspace'
        ];
        if (!allowedChars.test(event.key)
            && !(event.ctrlKey && allowedCtrlChars.test(event.key))
            && !(allowedOtherKeys.includes(event.key))) {
            event.preventDefault();
        }
    };
    /**
     * @protected
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.fetchCountryData = /**
     * @protected
     * @return {?}
     */
    function () {
        var _this = this;
        this.countryCodeData.allCountries.forEach((/**
         * @param {?} c
         * @return {?}
         */
        function (c) {
            /** @type {?} */
            var country = {
                name: c[0].toString(),
                iso2: c[1].toString(),
                dialCode: c[2].toString(),
                priority: +c[3] || 0,
                areaCodes: (/** @type {?} */ (c[4])) || undefined,
                flagClass: c[1].toString().toLocaleLowerCase(),
                placeHolder: ''
            };
            if (_this.enablePlaceholder) {
                country.placeHolder = _this.getPhoneNumberPlaceHolder(country.iso2.toUpperCase());
            }
            _this.allCountries.push(country);
        }));
    };
    /**
     * @protected
     * @param {?} countryCode
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.getPhoneNumberPlaceHolder = /**
     * @protected
     * @param {?} countryCode
     * @return {?}
     */
    function (countryCode) {
        try {
            return this.phoneUtil.format(this.phoneUtil.getExampleNumber(countryCode), lpn.PhoneNumberFormat.INTERNATIONAL);
        }
        catch (e) {
            return e;
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.propagateChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.writeValue = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        var _this = this;
        if (obj == null) {
            this.ngOnInit();
        }
        this.phoneNumber = obj;
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.onPhoneNumberChange();
        }), 1);
    };
    /**
     * @private
     * @param {?} countryCode
     * @param {?} number
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.getCountryIsoCode = /**
     * @private
     * @param {?} countryCode
     * @param {?} number
     * @return {?}
     */
    function (countryCode, number) {
        // Will use this to match area code from the first numbers
        /** @type {?} */
        var rawNumber = number['values_']['2'].toString();
        // List of all countries with countryCode (can be more than one. e.x. US, CA, DO, PR all have +1 countryCode)
        /** @type {?} */
        var countries = this.allCountries.filter((/**
         * @param {?} c
         * @return {?}
         */
        function (c) { return c.dialCode === countryCode.toString(); }));
        // Main country is the country, which has no areaCodes specified in country-code.ts file.
        /** @type {?} */
        var mainCountry = countries.find((/**
         * @param {?} c
         * @return {?}
         */
        function (c) { return c.areaCodes === undefined; }));
        // Secondary countries are all countries, which have areaCodes specified in country-code.ts file.
        /** @type {?} */
        var secondaryCountries = countries.filter((/**
         * @param {?} c
         * @return {?}
         */
        function (c) { return c.areaCodes !== undefined; }));
        /** @type {?} */
        var matchedCountry = mainCountry ? mainCountry.iso2 : undefined;
        /*
            Interate over each secondary country and check if nationalNumber starts with any of areaCodes available.
            If no matches found, fallback to the main country.
        */
        secondaryCountries.forEach((/**
         * @param {?} country
         * @return {?}
         */
        function (country) {
            country.areaCodes.forEach((/**
             * @param {?} areaCode
             * @return {?}
             */
            function (areaCode) {
                if (rawNumber.startsWith(areaCode)) {
                    matchedCountry = country.iso2;
                }
            }));
        }));
        return matchedCountry;
    };
    /**
     * @param {?} placeholder
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.separateDialCodePlaceHolder = /**
     * @param {?} placeholder
     * @return {?}
     */
    function (placeholder) {
        return this.removeDialCode(placeholder);
    };
    /**
     * @private
     * @param {?} phoneNumber
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.removeDialCode = /**
     * @private
     * @param {?} phoneNumber
     * @return {?}
     */
    function (phoneNumber) {
        if (this.separateDialCode && phoneNumber) {
            phoneNumber = phoneNumber.substr(phoneNumber.indexOf(' ') + 1);
        }
        return phoneNumber;
    };
    // adjust input alignment
    // adjust input alignment
    /**
     * @private
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.checkSeparateDialCodeStyle = 
    // adjust input alignment
    /**
     * @private
     * @return {?}
     */
    function () {
        if (this.separateDialCode && this.selectedCountry) {
            /** @type {?} */
            var cntryCd = this.selectedCountry.dialCode;
            this.separateDialCodeClass = 'separate-dial-code iti-sdc-' + (cntryCd.length + 1);
        }
        else {
            this.separateDialCodeClass = '';
        }
    };
    NgxIntlTelInputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-intl-tel-input',
                    template: "<div class=\"intl-tel-input allow-dropdown\" [ngClass]=\"separateDialCodeClass\">\n  <div class=\"flag-container\" dropdown [ngClass]=\"{'disabled': disabled}\">\n    <div class=\"selected-flag dropdown-toggle\" dropdownToggle>\n      <div class=\"iti-flag\" [ngClass]=\"selectedCountry?.flagClass\"\n        [tooltip]=\"selectedCountry ? selectedCountry[tooltipField] : ''\"></div>\n      <div *ngIf=\"separateDialCode\" class=\"selected-dial-code\">+{{selectedCountry.dialCode}}</div>\n      <div class=\"iti-arrow\"></div>\n    </div>\n    <div *dropdownMenu class=\"dropdown-menu country-dropdown\">\n      <div class=\"search-container\" *ngIf=\"searchCountryFlag && searchCountryField\">\n        <input id=\"country-search-box\" [(ngModel)]=\"countrySearchText\" (keyup)=\"searchCountry()\"\n          (click)=\"$event.stopPropagation()\" [placeholder]=\"searchCountryPlaceholder\" autofocus>\n      </div>\n      <ul class=\"country-list\" #countryList>\n        <li class=\"country\" *ngFor=\"let country of preferredCountriesInDropDown\"\n          (click)=\"onCountrySelect(country, focusable)\" [id]=\"country.iso2\">\n          <div class=\"flag-box\">\n            <div class=\"iti-flag\" [ngClass]=\"country.flagClass\"></div>\n          </div>\n          <span class=\"country-name\">{{country.name}}</span>\n          <span class=\"dial-code\">+{{country.dialCode}}</span>\n        </li>\n        <li class=\"divider\" *ngIf=\"preferredCountriesInDropDown?.length\"></li>\n        <li class=\"country\" *ngFor=\"let country of allCountries\" (click)=\"onCountrySelect(country, focusable)\"\n          [id]=\"country.iso2\">\n          <div class=\"flag-box\">\n            <div class=\"iti-flag\" [ngClass]=\"country.flagClass\"></div>\n          </div>\n          <span class=\"country-name\">{{country.name}}</span>\n          <span class=\"dial-code\">+{{country.dialCode}}</span>\n        </li>\n      </ul>\n    </div>\n  </div>\n  <input type=\"tel\" id=\"phone\" autocomplete=\"off\" [ngClass]=\"cssClass\" (blur)=\"onTouched()\"\n    (keypress)=\"onInputKeyPress($event)\" [(ngModel)]=\"phoneNumber\" (ngModelChange)=\"onPhoneNumberChange()\"\n    [disabled]=\"disabled\" [placeholder]=\"separateDialCodePlaceHolder(selectedCountry?.placeHolder || '')\"\n    [attr.maxLength]=\"maxLength\" [attr.validation]=\"phoneValidation\" #focusable>\n</div>",
                    providers: [
                        CountryCode,
                        {
                            provide: NG_VALUE_ACCESSOR,
                            // tslint:disable-next-line:no-forward-ref
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return NgxIntlTelInputComponent; })),
                            multi: true
                        },
                        {
                            provide: NG_VALIDATORS,
                            useValue: ɵ0,
                            multi: true,
                        }
                    ],
                    styles: ["li.country:hover{background-color:rgba(0,0,0,.05)}.selected-flag.dropdown-toggle:after{content:none}.flag-container.disabled{cursor:default!important}.intl-tel-input.allow-dropdown .flag-container.disabled:hover .selected-flag{background:0 0}.country-dropdown{border:1px solid #ccc;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;padding:1px;border-collapse:collapse}.search-container{position:relative}.search-container input{width:100%;border:none;border-bottom:1px solid #ccc;padding-left:10px}.search-icon{position:absolute;z-index:2;width:25px;margin:1px 10px}.country-list{position:relative;border:none}.intl-tel-input input#country-search-box{padding-left:6px}.intl-tel-input.separate-dial-code .selected-flag,.intl-tel-input.separate-dial-code.allow-dropdown.iti-sdc-2 .selected-flag,.intl-tel-input.separate-dial-code.allow-dropdown.iti-sdc-3 .selected-flag,.intl-tel-input.separate-dial-code.allow-dropdown.iti-sdc-4 .selected-flag{width:93px}.intl-tel-input.separate-dial-code input,.intl-tel-input.separate-dial-code.allow-dropdown.iti-sdc-2 input,.intl-tel-input.separate-dial-code.allow-dropdown.iti-sdc-3 input,.intl-tel-input.separate-dial-code.allow-dropdown.iti-sdc-4 input{padding-left:98px}"]
                }] }
    ];
    /** @nocollapse */
    NgxIntlTelInputComponent.ctorParameters = function () { return [
        { type: CountryCode }
    ]; };
    NgxIntlTelInputComponent.propDecorators = {
        value: [{ type: Input }],
        preferredCountries: [{ type: Input }],
        enablePlaceholder: [{ type: Input }],
        cssClass: [{ type: Input }],
        onlyCountries: [{ type: Input }],
        enableAutoCountrySelect: [{ type: Input }],
        searchCountryFlag: [{ type: Input }],
        searchCountryField: [{ type: Input }],
        searchCountryPlaceholder: [{ type: Input }],
        maxLength: [{ type: Input }],
        tooltipField: [{ type: Input }],
        selectFirstCountry: [{ type: Input }],
        selectedCountryISO: [{ type: Input }],
        phoneValidation: [{ type: Input }],
        countryChange: [{ type: Output }],
        separateDialCode: [{ type: Input }],
        countryList: [{ type: ViewChild, args: ['countryList', { static: false },] }]
    };
    return NgxIntlTelInputComponent;
}());
export { NgxIntlTelInputComponent };
if (false) {
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.value;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.preferredCountries;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.enablePlaceholder;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.cssClass;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.onlyCountries;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.enableAutoCountrySelect;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.searchCountryFlag;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.searchCountryField;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.searchCountryPlaceholder;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.maxLength;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.tooltipField;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.selectFirstCountry;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.selectedCountryISO;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.phoneValidation;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.countryChange;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.selectedCountry;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.separateDialCode;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.separateDialCodeClass;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.phoneNumber;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.allCountries;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.preferredCountriesInDropDown;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.phoneUtil;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.disabled;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.errors;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.countrySearchText;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.countryList;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.onTouched;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.propagateChange;
    /**
     * @type {?}
     * @private
     */
    NgxIntlTelInputComponent.prototype.countryCodeData;
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWludGwtdGVsLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1pbnRsLXRlbC1pbnB1dC8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtaW50bC10ZWwtaW5wdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLFVBQVUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBNEIsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1SSxPQUFPLEVBQUUsYUFBYSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBRXRFLE9BQU8sS0FBSyxHQUFHLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdkUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzFELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztTQWdCekMsb0JBQW9CO0FBZGpDO0lBa0VDLGtDQUNTLGVBQTRCO1FBQTVCLG9CQUFlLEdBQWYsZUFBZSxDQUFhO1FBOUM1QixVQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ1gsdUJBQWtCLEdBQWtCLEVBQUUsQ0FBQztRQUN2QyxzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDekIsYUFBUSxHQUFHLGNBQWMsQ0FBQztRQUMxQixrQkFBYSxHQUFrQixFQUFFLENBQUM7UUFDbEMsNEJBQXVCLEdBQUcsSUFBSSxDQUFDO1FBQy9CLHNCQUFpQixHQUFHLEtBQUssQ0FBQztRQUMxQix1QkFBa0IsR0FBeUIsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwRSw2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Q0FBd0I7O0lBQ3hCLGdEQUFvQzs7SUFDcEMsc0RBQW1DOztJQUNuQyxzREFBd0M7O0lBQ3hDLG1EQUFnQzs7SUFFaEMsaURBQStEOztJQUUvRCxtREFRRTs7SUFHRixvREFBa0M7O0lBQ2xDLHlEQUE4Qjs7SUFFOUIsK0NBQWlCOztJQUNqQixnREFBa0M7O0lBQ2xDLGdFQUFrRDs7SUFFbEQsNkNBQW1EOztJQUNuRCw0Q0FBaUI7O0lBQ2pCLDBDQUFtRDs7SUFDbkQscURBQXVCOztJQUV2QiwrQ0FBcUU7O0lBRXJFLDZDQUFzQjs7SUFDdEIsbURBQWtDOzs7OztJQUdqQyxtREFBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgZm9yd2FyZFJlZiwgSW5wdXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgU2ltcGxlQ2hhbmdlcywgT25DaGFuZ2VzLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMSURBVE9SUywgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb3VudHJ5Q29kZSB9IGZyb20gJy4vZGF0YS9jb3VudHJ5LWNvZGUnO1xuaW1wb3J0IHsgcGhvbmVOdW1iZXJWYWxpZGF0b3IgfSBmcm9tICcuL25neC1pbnRsLXRlbC1pbnB1dC52YWxpZGF0b3InO1xuaW1wb3J0IHsgQ291bnRyeSB9IGZyb20gJy4vbW9kZWwvY291bnRyeS5tb2RlbCc7XG5pbXBvcnQgKiBhcyBscG4gZnJvbSAnZ29vZ2xlLWxpYnBob25lbnVtYmVyJztcbmltcG9ydCB7IFNlYXJjaENvdW50cnlGaWVsZCB9IGZyb20gJy4vZW51bXMvc2VhcmNoLWNvdW50cnktZmllbGQuZW51bSc7XG5pbXBvcnQgeyBUb29sdGlwTGFiZWwgfSBmcm9tICcuL2VudW1zL3Rvb2x0aXAtbGFiZWwuZW51bSc7XG5pbXBvcnQgeyBDb3VudHJ5SVNPIH0gZnJvbSAnLi9lbnVtcy9jb3VudHJ5LWlzby5lbnVtJztcblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnbmd4LWludGwtdGVsLWlucHV0Jyxcblx0dGVtcGxhdGVVcmw6ICcuL25neC1pbnRsLXRlbC1pbnB1dC5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWycuL25neC1pbnRsLXRlbC1pbnB1dC5jb21wb25lbnQuY3NzJ10sXG5cdHByb3ZpZGVyczogW1xuXHRcdENvdW50cnlDb2RlLFxuXHRcdHtcblx0XHRcdHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuXHRcdFx0Ly8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWZvcndhcmQtcmVmXG5cdFx0XHR1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ3hJbnRsVGVsSW5wdXRDb21wb25lbnQpLFxuXHRcdFx0bXVsdGk6IHRydWVcblx0XHR9LFxuXHRcdHtcblx0XHRcdHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXG5cdFx0XHR1c2VWYWx1ZTogcGhvbmVOdW1iZXJWYWxpZGF0b3IsXG5cdFx0XHRtdWx0aTogdHJ1ZSxcblx0XHR9XG5cdF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4SW50bFRlbElucHV0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuXG5cdEBJbnB1dCgpIHZhbHVlID0gJyc7XG5cdEBJbnB1dCgpIHByZWZlcnJlZENvdW50cmllczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuXHRASW5wdXQoKSBlbmFibGVQbGFjZWhvbGRlciA9IHRydWU7XG5cdEBJbnB1dCgpIGNzc0NsYXNzID0gJ2Zvcm0tY29udHJvbCc7XG5cdEBJbnB1dCgpIG9ubHlDb3VudHJpZXM6IEFycmF5PHN0cmluZz4gPSBbXTtcblx0QElucHV0KCkgZW5hYmxlQXV0b0NvdW50cnlTZWxlY3QgPSB0cnVlO1xuXHRASW5wdXQoKSBzZWFyY2hDb3VudHJ5RmxhZyA9IGZhbHNlO1xuXHRASW5wdXQoKSBzZWFyY2hDb3VudHJ5RmllbGQ6IFNlYXJjaENvdW50cnlGaWVsZFtdID0gW1NlYXJjaENvdW50cnlGaWVsZC5BbGxdO1xuXHRASW5wdXQoKSBzZWFyY2hDb3VudHJ5UGxhY2Vob2xkZXIgPSAnU2VhcmNoIENvdW50cnknO1xuXHRASW5wdXQoKSBtYXhMZW5ndGggPSAnJztcblx0QElucHV0KCkgdG9vbHRpcEZpZWxkOiBUb29sdGlwTGFiZWw7XG5cdEBJbnB1dCgpIHNlbGVjdEZpcnN0Q291bnRyeSA9IHRydWU7XG5cdEBJbnB1dCgpIHNlbGVjdGVkQ291bnRyeUlTTzogQ291bnRyeUlTTztcblx0QElucHV0KCkgcGhvbmVWYWxpZGF0aW9uID0gdHJ1ZTtcblxuXHRAT3V0cHV0KCkgcmVhZG9ubHkgY291bnRyeUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Q291bnRyeT4oKTtcblxuXHRzZWxlY3RlZENvdW50cnk6IENvdW50cnkgPSB7XG5cdFx0YXJlYUNvZGVzOiB1bmRlZmluZWQsXG5cdFx0ZGlhbENvZGU6ICcnLFxuXHRcdGZsYWdDbGFzczogJycsXG5cdFx0aXNvMjogJycsXG5cdFx0bmFtZTogJycsXG5cdFx0cGxhY2VIb2xkZXI6ICcnLFxuXHRcdHByaW9yaXR5OiAwXG5cdH07XG5cblx0Ly8gZGlzcGxheSB0aGUgY291bnRyeSBkaWFsIGNvZGUgbmV4dCB0byB0aGUgc2VsZWN0ZWQgZmxhZ1xuXHRASW5wdXQoKSBzZXBhcmF0ZURpYWxDb2RlID0gZmFsc2U7XG5cdHNlcGFyYXRlRGlhbENvZGVDbGFzczogc3RyaW5nO1xuXG5cdHBob25lTnVtYmVyID0gJyc7XG5cdGFsbENvdW50cmllczogQXJyYXk8Q291bnRyeT4gPSBbXTtcblx0cHJlZmVycmVkQ291bnRyaWVzSW5Ecm9wRG93bjogQXJyYXk8Q291bnRyeT4gPSBbXTtcblx0Ly8gSGFzIHRvIGJlICdhbnknIHRvIHByZXZlbnQgYSBuZWVkIHRvIGluc3RhbGwgQHR5cGVzL2dvb2dsZS1saWJwaG9uZW51bWJlciBieSB0aGUgcGFja2FnZSB1c2VyLi4uXG5cdHBob25lVXRpbDogYW55ID0gbHBuLlBob25lTnVtYmVyVXRpbC5nZXRJbnN0YW5jZSgpO1xuXHRkaXNhYmxlZCA9IGZhbHNlO1xuXHRlcnJvcnM6IEFycmF5PGFueT4gPSBbJ1Bob25lIG51bWJlciBpcyByZXF1aXJlZC4nXTtcblx0Y291bnRyeVNlYXJjaFRleHQgPSAnJztcblxuXHRAVmlld0NoaWxkKCdjb3VudHJ5TGlzdCcsIHsgc3RhdGljOiBmYWxzZSB9KSBjb3VudHJ5TGlzdDogRWxlbWVudFJlZjtcblxuXHRvblRvdWNoZWQgPSAoKSA9PiB7IH07XG5cdHByb3BhZ2F0ZUNoYW5nZSA9IChfOiBhbnkpID0+IHsgfTtcblxuXHRjb25zdHJ1Y3Rvcihcblx0XHRwcml2YXRlIGNvdW50cnlDb2RlRGF0YTogQ291bnRyeUNvZGVcblx0KSB7IH1cblxuXHRuZ09uSW5pdCgpIHtcblx0XHR0aGlzLmZldGNoQ291bnRyeURhdGEoKTtcblx0XHRpZiAodGhpcy5wcmVmZXJyZWRDb3VudHJpZXMubGVuZ3RoKSB7XG5cdFx0XHR0aGlzLmdldFByZWZlcnJlZENvdW50cmllcygpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5vbmx5Q291bnRyaWVzLmxlbmd0aCkge1xuXHRcdFx0dGhpcy5hbGxDb3VudHJpZXMgPSB0aGlzLmFsbENvdW50cmllcy5maWx0ZXIoYyA9PiB0aGlzLm9ubHlDb3VudHJpZXMuaW5jbHVkZXMoYy5pc28yKSk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLnNlbGVjdEZpcnN0Q291bnRyeSkge1xuXHRcdFx0aWYgKHRoaXMucHJlZmVycmVkQ291bnRyaWVzSW5Ecm9wRG93bi5sZW5ndGgpIHtcblx0XHRcdFx0dGhpcy5zZXRTZWxlY3RlZENvdW50cnkodGhpcy5wcmVmZXJyZWRDb3VudHJpZXNJbkRyb3BEb3duWzBdKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuc2V0U2VsZWN0ZWRDb3VudHJ5KHRoaXMuYWxsQ291bnRyaWVzWzBdKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5nZXRTZWxlY3RlZENvdW50cnkoKTtcblx0XHR0aGlzLmNoZWNrU2VwYXJhdGVEaWFsQ29kZVN0eWxlKCk7XG5cdH1cblxuXHRuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG5cdFx0aWYgKHRoaXMuYWxsQ291bnRyaWVzICYmIGNoYW5nZXNbJ3NlbGVjdGVkQ291bnRyeUlTTyddXG5cdFx0XHQmJiBjaGFuZ2VzWydzZWxlY3RlZENvdW50cnlJU08nXS5jdXJyZW50VmFsdWUgIT09IGNoYW5nZXNbJ3NlbGVjdGVkQ291bnRyeUlTTyddLnByZXZpb3VzVmFsdWUpIHtcblx0XHRcdHRoaXMuZ2V0U2VsZWN0ZWRDb3VudHJ5KCk7XG5cdFx0fVxuXHRcdGlmIChjaGFuZ2VzLnByZWZlcnJlZENvdW50cmllcykge1xuXHRcdFx0dGhpcy5nZXRQcmVmZXJyZWRDb3VudHJpZXMoKTtcblx0XHR9XHRcdFxuXHRcdHRoaXMuY2hlY2tTZXBhcmF0ZURpYWxDb2RlU3R5bGUoKTtcblx0fVxuXG5cdGdldFByZWZlcnJlZENvdW50cmllcygpIHtcblx0XHRpZiAodGhpcy5wcmVmZXJyZWRDb3VudHJpZXMubGVuZ3RoKSB7XG5cdFx0XHR0aGlzLnByZWZlcnJlZENvdW50cmllc0luRHJvcERvd24gPSBbXTtcblx0XHRcdHRoaXMucHJlZmVycmVkQ291bnRyaWVzLmZvckVhY2goaXNvMiA9PiB7XG5cdFx0XHRcdGNvbnN0IHByZWZlcnJlZENvdW50cnkgPSB0aGlzLmFsbENvdW50cmllcy5maWx0ZXIoKGMpID0+IHtcblx0XHRcdFx0XHRyZXR1cm4gYy5pc28yID09PSBpc28yO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHR0aGlzLnByZWZlcnJlZENvdW50cmllc0luRHJvcERvd24ucHVzaChwcmVmZXJyZWRDb3VudHJ5WzBdKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdGdldFNlbGVjdGVkQ291bnRyeSgpIHtcblx0XHRpZiAodGhpcy5zZWxlY3RlZENvdW50cnlJU08pIHtcblx0XHRcdHRoaXMuc2VsZWN0ZWRDb3VudHJ5ID0gdGhpcy5hbGxDb3VudHJpZXMuZmluZChjID0+IHsgcmV0dXJuIChjLmlzbzIudG9Mb3dlckNhc2UoKSA9PT0gdGhpcy5zZWxlY3RlZENvdW50cnlJU08udG9Mb3dlckNhc2UoKSk7IH0pO1xuXHRcdFx0aWYgKHRoaXMuc2VsZWN0ZWRDb3VudHJ5KSB7XG5cdFx0XHRcdGlmICh0aGlzLnBob25lTnVtYmVyKSB7XG5cdFx0XHRcdFx0dGhpcy5vblBob25lTnVtYmVyQ2hhbmdlKCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5wcm9wYWdhdGVDaGFuZ2UodW5kZWZpbmVkKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHNldFNlbGVjdGVkQ291bnRyeShjb3VudHJ5OiBDb3VudHJ5KSB7XG5cdFx0dGhpcy5zZWxlY3RlZENvdW50cnkgPSBjb3VudHJ5O1xuXHRcdHRoaXMuY291bnRyeUNoYW5nZS5lbWl0KGNvdW50cnkpO1xuXHR9XG5cblxuXHQvKipcblx0ICogU2VhcmNoIGNvdW50cnkgYmFzZWQgb24gY291bnRyeSBuYW1lLCBpc28yLCBkaWFsQ29kZSBvciBhbGwgb2YgdGhlbS5cblx0ICovXG5cdHNlYXJjaENvdW50cnkoKSB7XG5cdFx0aWYgKCF0aGlzLmNvdW50cnlTZWFyY2hUZXh0KSB7XG5cdFx0XHR0aGlzLmNvdW50cnlMaXN0Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignbGknKS5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiAnc21vb3RoJyB9KTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Y29uc3QgY291bnRyeVNlYXJjaFRleHRMb3dlciA9IHRoaXMuY291bnRyeVNlYXJjaFRleHQudG9Mb3dlckNhc2UoKTtcblx0XHRjb25zdCBjb3VudHJ5ID0gdGhpcy5hbGxDb3VudHJpZXMuZmlsdGVyKGMgPT4ge1xuXHRcdFx0aWYgKHRoaXMuc2VhcmNoQ291bnRyeUZpZWxkLmluZGV4T2YoU2VhcmNoQ291bnRyeUZpZWxkLkFsbCkgPiAtMSkge1xuXHRcdFx0XHQvLyBTZWFyY2ggaW4gYWxsIGZpZWxkc1xuXHRcdFx0XHRpZiAoYy5pc28yLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aChjb3VudHJ5U2VhcmNoVGV4dExvd2VyKSkge1xuXHRcdFx0XHRcdHJldHVybiBjO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChjLm5hbWUudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKGNvdW50cnlTZWFyY2hUZXh0TG93ZXIpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGM7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGMuZGlhbENvZGUuc3RhcnRzV2l0aCh0aGlzLmNvdW50cnlTZWFyY2hUZXh0KSkge1xuXHRcdFx0XHRcdHJldHVybiBjO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBPciBzZWFyY2ggYnkgc3BlY2lmaWMgU2VhcmNoQ291bnRyeUZpZWxkKHMpXG5cdFx0XHRcdGlmICh0aGlzLnNlYXJjaENvdW50cnlGaWVsZC5pbmRleE9mKFNlYXJjaENvdW50cnlGaWVsZC5Jc28yKSA+IC0xKSB7XG5cdFx0XHRcdFx0aWYgKGMuaXNvMi50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoY291bnRyeVNlYXJjaFRleHRMb3dlcikpIHtcblx0XHRcdFx0XHRcdHJldHVybiBjO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodGhpcy5zZWFyY2hDb3VudHJ5RmllbGQuaW5kZXhPZihTZWFyY2hDb3VudHJ5RmllbGQuTmFtZSkgPiAtMSkge1xuXHRcdFx0XHRcdGlmIChjLm5hbWUudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKGNvdW50cnlTZWFyY2hUZXh0TG93ZXIpKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gYztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHRoaXMuc2VhcmNoQ291bnRyeUZpZWxkLmluZGV4T2YoU2VhcmNoQ291bnRyeUZpZWxkLkRpYWxDb2RlKSA+IC0xKSB7XG5cdFx0XHRcdFx0aWYgKGMuZGlhbENvZGUuc3RhcnRzV2l0aCh0aGlzLmNvdW50cnlTZWFyY2hUZXh0KSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGM7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRpZiAoY291bnRyeS5sZW5ndGggPiAwKSB7XG5cdFx0XHRjb25zdCBlbCA9IHRoaXMuY291bnRyeUxpc3QubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjJyArIGNvdW50cnlbMF0uaXNvMik7XG5cdFx0XHRpZiAoZWwpIHtcblx0XHRcdFx0ZWwuc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogJ3Ntb290aCcgfSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5jaGVja1NlcGFyYXRlRGlhbENvZGVTdHlsZSgpO1xuXHR9XG5cblx0cHVibGljIG9uUGhvbmVOdW1iZXJDaGFuZ2UoKTogdm9pZCB7XG5cdFx0dGhpcy52YWx1ZSA9IHRoaXMucGhvbmVOdW1iZXI7XG5cblx0XHRsZXQgbnVtYmVyOiBscG4uUGhvbmVOdW1iZXI7XG5cdFx0dHJ5IHtcblx0XHRcdG51bWJlciA9IHRoaXMucGhvbmVVdGlsLnBhcnNlKHRoaXMucGhvbmVOdW1iZXIsIHRoaXMuc2VsZWN0ZWRDb3VudHJ5LmlzbzIudG9VcHBlckNhc2UoKSk7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdH1cblxuXHRcdGxldCBjb3VudHJ5Q29kZSA9IHRoaXMuc2VsZWN0ZWRDb3VudHJ5LmlzbzI7XG5cdFx0Ly8gYXV0byBzZWxlY3QgY291bnRyeSBiYXNlZCBvbiB0aGUgZXh0ZW5zaW9uIChhbmQgYXJlYUNvZGUgaWYgbmVlZGVkKSAoZS5nIHNlbGVjdCBDYW5hZGEgaWYgbnVtYmVyIHN0YXJ0cyB3aXRoICsxIDQxNilcblx0XHRpZiAodGhpcy5lbmFibGVBdXRvQ291bnRyeVNlbGVjdCkge1xuXHRcdFx0Y291bnRyeUNvZGUgPSBudW1iZXIgJiYgbnVtYmVyLmdldENvdW50cnlDb2RlKClcblx0XHRcdFx0PyB0aGlzLmdldENvdW50cnlJc29Db2RlKG51bWJlci5nZXRDb3VudHJ5Q29kZSgpLCBudW1iZXIpXG5cdFx0XHRcdDogdGhpcy5zZWxlY3RlZENvdW50cnkuaXNvMjtcblx0XHRcdGlmIChjb3VudHJ5Q29kZSAmJiBjb3VudHJ5Q29kZSAhPT0gdGhpcy5zZWxlY3RlZENvdW50cnkuaXNvMikge1xuXHRcdFx0XHRjb25zdCBuZXdDb3VudHJ5ID0gdGhpcy5hbGxDb3VudHJpZXMuZmluZChjID0+IGMuaXNvMiA9PT0gY291bnRyeUNvZGUpO1xuXHRcdFx0XHRpZiAobmV3Q291bnRyeSkge1xuXHRcdFx0XHRcdHRoaXMuc2VsZWN0ZWRDb3VudHJ5ID0gbmV3Q291bnRyeTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRjb3VudHJ5Q29kZSA9IGNvdW50cnlDb2RlID8gY291bnRyeUNvZGUgOiB0aGlzLnNlbGVjdGVkQ291bnRyeS5pc28yO1xuXG5cdFx0dGhpcy5jaGVja1NlcGFyYXRlRGlhbENvZGVTdHlsZSgpO1xuXG5cdFx0aWYgKCF0aGlzLnZhbHVlKSB7XG5cdFx0XHQvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tbnVsbC1rZXl3b3JkXG5cdFx0XHR0aGlzLnByb3BhZ2F0ZUNoYW5nZShudWxsKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIGludGxObyA9IG51bWJlciA/IHRoaXMucGhvbmVVdGlsLmZvcm1hdChudW1iZXIsIGxwbi5QaG9uZU51bWJlckZvcm1hdC5JTlRFUk5BVElPTkFMKSA6ICcnO1xuXG5cdFx0XHQvLyBwYXJzZSBwaG9uZU51bWJlciBpZiBzZXBhcmF0ZSBkaWFsIGNvZGUgaXMgbmVlZGVkXG5cdFx0XHRpZiAodGhpcy5zZXBhcmF0ZURpYWxDb2RlICYmIGludGxObykge1xuXHRcdFx0XHR0aGlzLnBob25lTnVtYmVyID0gdGhpcy5yZW1vdmVEaWFsQ29kZShpbnRsTm8pO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnByb3BhZ2F0ZUNoYW5nZSh7XG5cdFx0XHRcdG51bWJlcjogdGhpcy52YWx1ZSxcblx0XHRcdFx0aW50ZXJuYXRpb25hbE51bWJlcjogaW50bE5vLFxuXHRcdFx0XHRuYXRpb25hbE51bWJlcjogbnVtYmVyID8gdGhpcy5waG9uZVV0aWwuZm9ybWF0KG51bWJlciwgbHBuLlBob25lTnVtYmVyRm9ybWF0Lk5BVElPTkFMKSA6ICcnLFxuXHRcdFx0XHRjb3VudHJ5Q29kZTogY291bnRyeUNvZGUudG9VcHBlckNhc2UoKSxcblx0XHRcdFx0ZGlhbENvZGU6ICcrJyArIHRoaXMuc2VsZWN0ZWRDb3VudHJ5LmRpYWxDb2RlXG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHRwdWJsaWMgb25Db3VudHJ5U2VsZWN0KGNvdW50cnk6IENvdW50cnksIGVsKTogdm9pZCB7XG5cdFx0dGhpcy5zZXRTZWxlY3RlZENvdW50cnkoY291bnRyeSk7XG5cblx0XHR0aGlzLmNoZWNrU2VwYXJhdGVEaWFsQ29kZVN0eWxlKCk7XG5cblx0XHRpZiAodGhpcy5waG9uZU51bWJlciAhPSBudWxsICYmIHRoaXMucGhvbmVOdW1iZXIubGVuZ3RoID4gMCkge1xuXHRcdFx0dGhpcy52YWx1ZSA9IHRoaXMucGhvbmVOdW1iZXI7XG5cblx0XHRcdGxldCBudW1iZXI6IGxwbi5QaG9uZU51bWJlcjtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdG51bWJlciA9IHRoaXMucGhvbmVVdGlsLnBhcnNlKHRoaXMucGhvbmVOdW1iZXIsIHRoaXMuc2VsZWN0ZWRDb3VudHJ5LmlzbzIudG9VcHBlckNhc2UoKSk7XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBpbnRsTm8gPSBudW1iZXIgPyB0aGlzLnBob25lVXRpbC5mb3JtYXQobnVtYmVyLCBscG4uUGhvbmVOdW1iZXJGb3JtYXQuSU5URVJOQVRJT05BTCkgOiAnJztcblxuXHRcdFx0Ly8gcGFyc2UgcGhvbmVOdW1iZXIgaWYgc2VwYXJhdGUgZGlhbCBjb2RlIGlzIG5lZWRlZFxuXHRcdFx0aWYgKHRoaXMuc2VwYXJhdGVEaWFsQ29kZSAmJiBpbnRsTm8pIHtcblx0XHRcdFx0dGhpcy5waG9uZU51bWJlciA9IHRoaXMucmVtb3ZlRGlhbENvZGUoaW50bE5vKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5wcm9wYWdhdGVDaGFuZ2Uoe1xuXHRcdFx0XHRudW1iZXI6IHRoaXMudmFsdWUsXG5cdFx0XHRcdGludGVybmF0aW9uYWxOdW1iZXI6IGludGxObyxcblx0XHRcdFx0bmF0aW9uYWxOdW1iZXI6IG51bWJlciA/IHRoaXMucGhvbmVVdGlsLmZvcm1hdChudW1iZXIsIGxwbi5QaG9uZU51bWJlckZvcm1hdC5OQVRJT05BTCkgOiAnJyxcblx0XHRcdFx0Y291bnRyeUNvZGU6IHRoaXMuc2VsZWN0ZWRDb3VudHJ5LmlzbzIudG9VcHBlckNhc2UoKSxcblx0XHRcdFx0ZGlhbENvZGU6ICcrJyArIHRoaXMuc2VsZWN0ZWRDb3VudHJ5LmRpYWxDb2RlXG5cdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5wcm9wYWdhdGVDaGFuZ2UobnVsbCk7XG5cdFx0fVxuXG5cdFx0ZWwuZm9jdXMoKTtcblx0fVxuXG5cdHB1YmxpYyBvbklucHV0S2V5UHJlc3MoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcblx0XHRjb25zdCBhbGxvd2VkQ2hhcnMgPSAvWzAtOVxcK1xcLVxcIF0vO1xuXHRcdGNvbnN0IGFsbG93ZWRDdHJsQ2hhcnMgPSAvW2F4Y3ZdLzsgLy8gQWxsb3dzIGNvcHktcGFzdGluZ1xuXHRcdGNvbnN0IGFsbG93ZWRPdGhlcktleXMgPSBbXG5cdFx0XHQnQXJyb3dMZWZ0JywgJ0Fycm93VXAnLCAnQXJyb3dSaWdodCcsICdBcnJvd0Rvd24nLFxuXHRcdFx0J0hvbWUnLCAnRW5kJywgJ0luc2VydCcsICdEZWxldGUnLCAnQmFja3NwYWNlJ1xuXHRcdF07XG5cblx0XHRpZiAoIWFsbG93ZWRDaGFycy50ZXN0KGV2ZW50LmtleSlcblx0XHRcdCYmICEoZXZlbnQuY3RybEtleSAmJiBhbGxvd2VkQ3RybENoYXJzLnRlc3QoZXZlbnQua2V5KSlcblx0XHRcdCYmICEoYWxsb3dlZE90aGVyS2V5cy5pbmNsdWRlcyhldmVudC5rZXkpKSkge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHR9XG5cdH1cblxuXHRwcm90ZWN0ZWQgZmV0Y2hDb3VudHJ5RGF0YSgpOiB2b2lkIHtcblx0XHR0aGlzLmNvdW50cnlDb2RlRGF0YS5hbGxDb3VudHJpZXMuZm9yRWFjaChjID0+IHtcblx0XHRcdGNvbnN0IGNvdW50cnk6IENvdW50cnkgPSB7XG5cdFx0XHRcdG5hbWU6IGNbMF0udG9TdHJpbmcoKSxcblx0XHRcdFx0aXNvMjogY1sxXS50b1N0cmluZygpLFxuXHRcdFx0XHRkaWFsQ29kZTogY1syXS50b1N0cmluZygpLFxuXHRcdFx0XHRwcmlvcml0eTogK2NbM10gfHwgMCxcblx0XHRcdFx0YXJlYUNvZGVzOiBjWzRdIGFzIHN0cmluZ1tdIHx8IHVuZGVmaW5lZCxcblx0XHRcdFx0ZmxhZ0NsYXNzOiBjWzFdLnRvU3RyaW5nKCkudG9Mb2NhbGVMb3dlckNhc2UoKSxcblx0XHRcdFx0cGxhY2VIb2xkZXI6ICcnXG5cdFx0XHR9O1xuXG5cdFx0XHRpZiAodGhpcy5lbmFibGVQbGFjZWhvbGRlcikge1xuXHRcdFx0XHRjb3VudHJ5LnBsYWNlSG9sZGVyID0gdGhpcy5nZXRQaG9uZU51bWJlclBsYWNlSG9sZGVyKGNvdW50cnkuaXNvMi50b1VwcGVyQ2FzZSgpKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5hbGxDb3VudHJpZXMucHVzaChjb3VudHJ5KTtcblx0XHR9KTtcblx0fVxuXG5cdHByb3RlY3RlZCBnZXRQaG9uZU51bWJlclBsYWNlSG9sZGVyKGNvdW50cnlDb2RlOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdHRyeSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5waG9uZVV0aWwuZm9ybWF0KHRoaXMucGhvbmVVdGlsLmdldEV4YW1wbGVOdW1iZXIoY291bnRyeUNvZGUpLCBscG4uUGhvbmVOdW1iZXJGb3JtYXQuSU5URVJOQVRJT05BTCk7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0cmV0dXJuIGU7XG5cdFx0fVxuXHR9XG5cblx0cmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG5cdFx0dGhpcy5wcm9wYWdhdGVDaGFuZ2UgPSBmbjtcblx0fVxuXG5cdHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcblx0XHR0aGlzLm9uVG91Y2hlZCA9IGZuO1xuXHR9XG5cblx0c2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG5cdFx0dGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG5cdH1cblxuXHR3cml0ZVZhbHVlKG9iajogYW55KTogdm9pZCB7XG5cdFx0aWYgKG9iaiA9PSBudWxsKSB7XG5cdFx0XHR0aGlzLm5nT25Jbml0KCk7XG5cdFx0fVxuXHRcdHRoaXMucGhvbmVOdW1iZXIgPSBvYmo7XG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHR0aGlzLm9uUGhvbmVOdW1iZXJDaGFuZ2UoKTtcblx0XHR9LCAxKTtcblx0fVxuXG5cdHByaXZhdGUgZ2V0Q291bnRyeUlzb0NvZGUoY291bnRyeUNvZGU6IG51bWJlciwgbnVtYmVyOiBscG4uUGhvbmVOdW1iZXIpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuXHRcdC8vIFdpbGwgdXNlIHRoaXMgdG8gbWF0Y2ggYXJlYSBjb2RlIGZyb20gdGhlIGZpcnN0IG51bWJlcnNcblx0XHRjb25zdCByYXdOdW1iZXIgPSBudW1iZXJbJ3ZhbHVlc18nXVsnMiddLnRvU3RyaW5nKCk7XG5cdFx0Ly8gTGlzdCBvZiBhbGwgY291bnRyaWVzIHdpdGggY291bnRyeUNvZGUgKGNhbiBiZSBtb3JlIHRoYW4gb25lLiBlLnguIFVTLCBDQSwgRE8sIFBSIGFsbCBoYXZlICsxIGNvdW50cnlDb2RlKVxuXHRcdGNvbnN0IGNvdW50cmllcyA9IHRoaXMuYWxsQ291bnRyaWVzLmZpbHRlcihjID0+IGMuZGlhbENvZGUgPT09IGNvdW50cnlDb2RlLnRvU3RyaW5nKCkpO1xuXHRcdC8vIE1haW4gY291bnRyeSBpcyB0aGUgY291bnRyeSwgd2hpY2ggaGFzIG5vIGFyZWFDb2RlcyBzcGVjaWZpZWQgaW4gY291bnRyeS1jb2RlLnRzIGZpbGUuXG5cdFx0Y29uc3QgbWFpbkNvdW50cnkgPSBjb3VudHJpZXMuZmluZChjID0+IGMuYXJlYUNvZGVzID09PSB1bmRlZmluZWQpO1xuXHRcdC8vIFNlY29uZGFyeSBjb3VudHJpZXMgYXJlIGFsbCBjb3VudHJpZXMsIHdoaWNoIGhhdmUgYXJlYUNvZGVzIHNwZWNpZmllZCBpbiBjb3VudHJ5LWNvZGUudHMgZmlsZS5cblx0XHRjb25zdCBzZWNvbmRhcnlDb3VudHJpZXMgPSBjb3VudHJpZXMuZmlsdGVyKGMgPT4gYy5hcmVhQ29kZXMgIT09IHVuZGVmaW5lZCk7XG5cdFx0bGV0IG1hdGNoZWRDb3VudHJ5ID0gbWFpbkNvdW50cnkgPyBtYWluQ291bnRyeS5pc28yIDogdW5kZWZpbmVkO1xuXG5cdFx0Lypcblx0XHRcdEludGVyYXRlIG92ZXIgZWFjaCBzZWNvbmRhcnkgY291bnRyeSBhbmQgY2hlY2sgaWYgbmF0aW9uYWxOdW1iZXIgc3RhcnRzIHdpdGggYW55IG9mIGFyZWFDb2RlcyBhdmFpbGFibGUuXG5cdFx0XHRJZiBubyBtYXRjaGVzIGZvdW5kLCBmYWxsYmFjayB0byB0aGUgbWFpbiBjb3VudHJ5LlxuXHRcdCovXG5cdFx0c2Vjb25kYXJ5Q291bnRyaWVzLmZvckVhY2goY291bnRyeSA9PiB7XG5cdFx0XHRjb3VudHJ5LmFyZWFDb2Rlcy5mb3JFYWNoKGFyZWFDb2RlID0+IHtcblx0XHRcdFx0aWYgKHJhd051bWJlci5zdGFydHNXaXRoKGFyZWFDb2RlKSkge1xuXHRcdFx0XHRcdG1hdGNoZWRDb3VudHJ5ID0gY291bnRyeS5pc28yO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdHJldHVybiBtYXRjaGVkQ291bnRyeTtcblx0fVxuXG5cdHNlcGFyYXRlRGlhbENvZGVQbGFjZUhvbGRlcihwbGFjZWhvbGRlcjogc3RyaW5nKTogc3RyaW5nIHtcblx0XHRyZXR1cm4gdGhpcy5yZW1vdmVEaWFsQ29kZShwbGFjZWhvbGRlcik7XG5cdH1cblxuXHRwcml2YXRlIHJlbW92ZURpYWxDb2RlKHBob25lTnVtYmVyOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdGlmICh0aGlzLnNlcGFyYXRlRGlhbENvZGUgJiYgcGhvbmVOdW1iZXIpIHtcblx0XHRcdHBob25lTnVtYmVyID0gcGhvbmVOdW1iZXIuc3Vic3RyKHBob25lTnVtYmVyLmluZGV4T2YoJyAnKSArIDEpO1xuXHRcdH1cblx0XHRyZXR1cm4gcGhvbmVOdW1iZXI7XG5cdH1cblxuXHQvLyBhZGp1c3QgaW5wdXQgYWxpZ25tZW50XG5cdHByaXZhdGUgY2hlY2tTZXBhcmF0ZURpYWxDb2RlU3R5bGUoKSB7XG5cdFx0aWYgKHRoaXMuc2VwYXJhdGVEaWFsQ29kZSAmJiB0aGlzLnNlbGVjdGVkQ291bnRyeSkge1xuXHRcdFx0dmFyIGNudHJ5Q2QgPSB0aGlzLnNlbGVjdGVkQ291bnRyeS5kaWFsQ29kZTtcblx0XHRcdHRoaXMuc2VwYXJhdGVEaWFsQ29kZUNsYXNzID0gJ3NlcGFyYXRlLWRpYWwtY29kZSBpdGktc2RjLScgKyAoY250cnlDZC5sZW5ndGggKyAxKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXBhcmF0ZURpYWxDb2RlQ2xhc3MgPSAnJztcblx0XHR9XG5cdH1cblxufVxuIl19