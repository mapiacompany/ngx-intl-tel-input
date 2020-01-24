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
const ɵ0 = phoneNumberValidator;
export class NgxIntlTelInputComponent {
    /**
     * @param {?} countryCodeData
     */
    constructor(countryCodeData) {
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
        () => { });
        this.propagateChange = (/**
         * @param {?} _
         * @return {?}
         */
        (_) => { });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.fetchCountryData();
        if (this.preferredCountries.length) {
            this.getPreferredCountries();
        }
        if (this.onlyCountries.length) {
            this.allCountries = this.allCountries.filter((/**
             * @param {?} c
             * @return {?}
             */
            c => this.onlyCountries.includes(c.iso2)));
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
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (this.allCountries && changes['selectedCountryISO']
            && changes['selectedCountryISO'].currentValue !== changes['selectedCountryISO'].previousValue) {
            this.getSelectedCountry();
        }
        if (changes.preferredCountries) {
            this.getPreferredCountries();
        }
        this.checkSeparateDialCodeStyle();
    }
    /**
     * @return {?}
     */
    getPreferredCountries() {
        if (this.preferredCountries.length) {
            this.preferredCountriesInDropDown = [];
            this.preferredCountries.forEach((/**
             * @param {?} iso2
             * @return {?}
             */
            iso2 => {
                /** @type {?} */
                const preferredCountry = this.allCountries.filter((/**
                 * @param {?} c
                 * @return {?}
                 */
                (c) => {
                    return c.iso2 === iso2;
                }));
                this.preferredCountriesInDropDown.push(preferredCountry[0]);
            }));
        }
    }
    /**
     * @return {?}
     */
    getSelectedCountry() {
        if (this.selectedCountryISO) {
            this.selectedCountry = this.allCountries.find((/**
             * @param {?} c
             * @return {?}
             */
            c => { return (c.iso2.toLowerCase() === this.selectedCountryISO.toLowerCase()); }));
            if (this.selectedCountry) {
                if (this.phoneNumber) {
                    this.onPhoneNumberChange();
                }
                else {
                    this.propagateChange(undefined);
                }
            }
        }
    }
    /**
     * @param {?} country
     * @return {?}
     */
    setSelectedCountry(country) {
        this.selectedCountry = country;
        this.countryChange.emit(country);
    }
    /**
     * Search country based on country name, iso2, dialCode or all of them.
     * @return {?}
     */
    searchCountry() {
        if (!this.countrySearchText) {
            this.countryList.nativeElement.querySelector('li').scrollIntoView({ behavior: 'smooth' });
            return;
        }
        /** @type {?} */
        const countrySearchTextLower = this.countrySearchText.toLowerCase();
        /** @type {?} */
        const country = this.allCountries.filter((/**
         * @param {?} c
         * @return {?}
         */
        c => {
            if (this.searchCountryField.indexOf(SearchCountryField.All) > -1) {
                // Search in all fields
                if (c.iso2.toLowerCase().startsWith(countrySearchTextLower)) {
                    return c;
                }
                if (c.name.toLowerCase().startsWith(countrySearchTextLower)) {
                    return c;
                }
                if (c.dialCode.startsWith(this.countrySearchText)) {
                    return c;
                }
            }
            else {
                // Or search by specific SearchCountryField(s)
                if (this.searchCountryField.indexOf(SearchCountryField.Iso2) > -1) {
                    if (c.iso2.toLowerCase().startsWith(countrySearchTextLower)) {
                        return c;
                    }
                }
                if (this.searchCountryField.indexOf(SearchCountryField.Name) > -1) {
                    if (c.name.toLowerCase().startsWith(countrySearchTextLower)) {
                        return c;
                    }
                }
                if (this.searchCountryField.indexOf(SearchCountryField.DialCode) > -1) {
                    if (c.dialCode.startsWith(this.countrySearchText)) {
                        return c;
                    }
                }
            }
        }));
        if (country.length > 0) {
            /** @type {?} */
            const el = this.countryList.nativeElement.querySelector('#' + country[0].iso2);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        }
        this.checkSeparateDialCodeStyle();
    }
    /**
     * @return {?}
     */
    onPhoneNumberChange() {
        this.value = this.phoneNumber;
        /** @type {?} */
        let number;
        try {
            number = this.phoneUtil.parse(this.phoneNumber, this.selectedCountry.iso2.toUpperCase());
        }
        catch (e) {
        }
        /** @type {?} */
        let countryCode = this.selectedCountry.iso2;
        // auto select country based on the extension (and areaCode if needed) (e.g select Canada if number starts with +1 416)
        if (this.enableAutoCountrySelect) {
            countryCode = number && number.getCountryCode()
                ? this.getCountryIsoCode(number.getCountryCode(), number)
                : this.selectedCountry.iso2;
            if (countryCode && countryCode !== this.selectedCountry.iso2) {
                /** @type {?} */
                const newCountry = this.allCountries.find((/**
                 * @param {?} c
                 * @return {?}
                 */
                c => c.iso2 === countryCode));
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
    }
    /**
     * @param {?} country
     * @param {?} el
     * @return {?}
     */
    onCountrySelect(country, el) {
        this.setSelectedCountry(country);
        this.checkSeparateDialCodeStyle();
        if (this.phoneNumber != null && this.phoneNumber.length > 0) {
            this.value = this.phoneNumber;
            /** @type {?} */
            let number;
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
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onInputKeyPress(event) {
        /** @type {?} */
        const allowedChars = /[0-9\+\-\ ]/;
        /** @type {?} */
        const allowedCtrlChars = /[axcv]/;
        // Allows copy-pasting
        /** @type {?} */
        const allowedOtherKeys = [
            'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown',
            'Home', 'End', 'Insert', 'Delete', 'Backspace'
        ];
        if (!allowedChars.test(event.key)
            && !(event.ctrlKey && allowedCtrlChars.test(event.key))
            && !(allowedOtherKeys.includes(event.key))) {
            event.preventDefault();
        }
    }
    /**
     * @protected
     * @return {?}
     */
    fetchCountryData() {
        this.countryCodeData.allCountries.forEach((/**
         * @param {?} c
         * @return {?}
         */
        c => {
            /** @type {?} */
            const country = {
                name: c[0].toString(),
                iso2: c[1].toString(),
                dialCode: c[2].toString(),
                priority: +c[3] || 0,
                areaCodes: (/** @type {?} */ (c[4])) || undefined,
                flagClass: c[1].toString().toLocaleLowerCase(),
                placeHolder: ''
            };
            if (this.enablePlaceholder) {
                country.placeHolder = this.getPhoneNumberPlaceHolder(country.iso2.toUpperCase());
            }
            this.allCountries.push(country);
        }));
    }
    /**
     * @protected
     * @param {?} countryCode
     * @return {?}
     */
    getPhoneNumberPlaceHolder(countryCode) {
        try {
            return this.phoneUtil.format(this.phoneUtil.getExampleNumber(countryCode), lpn.PhoneNumberFormat.INTERNATIONAL);
        }
        catch (e) {
            return e;
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    writeValue(obj) {
        if (obj == null) {
            this.ngOnInit();
        }
        this.phoneNumber = obj;
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.onPhoneNumberChange();
        }), 1);
    }
    /**
     * @private
     * @param {?} countryCode
     * @param {?} number
     * @return {?}
     */
    getCountryIsoCode(countryCode, number) {
        // Will use this to match area code from the first numbers
        /** @type {?} */
        const rawNumber = number['values_']['2'].toString();
        // List of all countries with countryCode (can be more than one. e.x. US, CA, DO, PR all have +1 countryCode)
        /** @type {?} */
        const countries = this.allCountries.filter((/**
         * @param {?} c
         * @return {?}
         */
        c => c.dialCode === countryCode.toString()));
        // Main country is the country, which has no areaCodes specified in country-code.ts file.
        /** @type {?} */
        const mainCountry = countries.find((/**
         * @param {?} c
         * @return {?}
         */
        c => c.areaCodes === undefined));
        // Secondary countries are all countries, which have areaCodes specified in country-code.ts file.
        /** @type {?} */
        const secondaryCountries = countries.filter((/**
         * @param {?} c
         * @return {?}
         */
        c => c.areaCodes !== undefined));
        /** @type {?} */
        let matchedCountry = mainCountry ? mainCountry.iso2 : undefined;
        /*
            Interate over each secondary country and check if nationalNumber starts with any of areaCodes available.
            If no matches found, fallback to the main country.
        */
        secondaryCountries.forEach((/**
         * @param {?} country
         * @return {?}
         */
        country => {
            country.areaCodes.forEach((/**
             * @param {?} areaCode
             * @return {?}
             */
            areaCode => {
                if (rawNumber.startsWith(areaCode)) {
                    matchedCountry = country.iso2;
                }
            }));
        }));
        return matchedCountry;
    }
    /**
     * @param {?} placeholder
     * @return {?}
     */
    separateDialCodePlaceHolder(placeholder) {
        return this.removeDialCode(placeholder);
    }
    /**
     * @private
     * @param {?} phoneNumber
     * @return {?}
     */
    removeDialCode(phoneNumber) {
        if (this.separateDialCode && phoneNumber) {
            phoneNumber = phoneNumber.substr(phoneNumber.indexOf(' ') + 1);
        }
        return phoneNumber;
    }
    // adjust input alignment
    /**
     * @private
     * @return {?}
     */
    checkSeparateDialCodeStyle() {
        if (this.separateDialCode && this.selectedCountry) {
            /** @type {?} */
            var cntryCd = this.selectedCountry.dialCode;
            this.separateDialCodeClass = 'separate-dial-code iti-sdc-' + (cntryCd.length + 1);
        }
        else {
            this.separateDialCodeClass = '';
        }
    }
}
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
                        () => NgxIntlTelInputComponent)),
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
NgxIntlTelInputComponent.ctorParameters = () => [
    { type: CountryCode }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWludGwtdGVsLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1pbnRsLXRlbC1pbnB1dC8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtaW50bC10ZWwtaW5wdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLFVBQVUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBNEIsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1SSxPQUFPLEVBQUUsYUFBYSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBRXRFLE9BQU8sS0FBSyxHQUFHLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdkUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzFELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztXQWdCekMsb0JBQW9CO0FBS2pDLE1BQU0sT0FBTyx3QkFBd0I7Ozs7SUErQ3BDLFlBQ1MsZUFBNEI7UUFBNUIsb0JBQWUsR0FBZixlQUFlLENBQWE7UUE5QzVCLFVBQUssR0FBRyxFQUFFLENBQUM7UUFDWCx1QkFBa0IsR0FBa0IsRUFBRSxDQUFDO1FBQ3ZDLHNCQUFpQixHQUFHLElBQUksQ0FBQztRQUN6QixhQUFRLEdBQUcsY0FBYyxDQUFDO1FBQzFCLGtCQUFhLEdBQWtCLEVBQUUsQ0FBQztRQUNsQyw0QkFBdUIsR0FBRyxJQUFJLENBQUM7UUFDL0Isc0JBQWlCLEdBQUcsS0FBSyxDQUFDO1FBQzFCLHVCQUFrQixHQUF5QixDQUFDLGtCQUFrQixDQUFDLEdB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bXBvbmVudCwgT25Jbml0LCBmb3J3YXJkUmVmLCBJbnB1dCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBTaW1wbGVDaGFuZ2VzLCBPbkNoYW5nZXMsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOR19WQUxJREFUT1JTLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENvdW50cnlDb2RlIH0gZnJvbSAnLi9kYXRhL2NvdW50cnktY29kZSc7XG5pbXBvcnQgeyBwaG9uZU51bWJlclZhbGlkYXRvciB9IGZyb20gJy4vbmd4LWludGwtdGVsLWlucHV0LnZhbGlkYXRvcic7XG5pbXBvcnQgeyBDb3VudHJ5IH0gZnJvbSAnLi9tb2RlbC9jb3VudHJ5Lm1vZGVsJztcbmltcG9ydCAqIGFzIGxwbiBmcm9tICdnb29nbGUtbGlicGhvbmVudW1iZXInO1xuaW1wb3J0IHsgU2VhcmNoQ291bnRyeUZpZWxkIH0gZnJvbSAnLi9lbnVtcy9zZWFyY2gtY291bnRyeS1maWVsZC5lbnVtJztcbmltcG9ydCB7IFRvb2x0aXBMYWJlbCB9IGZyb20gJy4vZW51bXMvdG9vbHRpcC1sYWJlbC5lbnVtJztcbmltcG9ydCB7IENvdW50cnlJU08gfSBmcm9tICcuL2VudW1zL2NvdW50cnktaXNvLmVudW0nO1xuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6ICduZ3gtaW50bC10ZWwtaW5wdXQnLFxuXHR0ZW1wbGF0ZVVybDogJy4vbmd4LWludGwtdGVsLWlucHV0LmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJy4vbmd4LWludGwtdGVsLWlucHV0LmNvbXBvbmVudC5jc3MnXSxcblx0cHJvdmlkZXJzOiBbXG5cdFx0Q291bnRyeUNvZGUsXG5cdFx0e1xuXHRcdFx0cHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG5cdFx0XHQvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZm9yd2FyZC1yZWZcblx0XHRcdHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5neEludGxUZWxJbnB1dENvbXBvbmVudCksXG5cdFx0XHRtdWx0aTogdHJ1ZVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0cHJvdmlkZTogTkdfVkFMSURBVE9SUyxcblx0XHRcdHVzZVZhbHVlOiBwaG9uZU51bWJlclZhbGlkYXRvcixcblx0XHRcdG11bHRpOiB0cnVlLFxuXHRcdH1cblx0XVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hJbnRsVGVsSW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG5cblx0QElucHV0KCkgdmFsdWUgPSAnJztcblx0QElucHV0KCkgcHJlZmVycmVkQ291bnRyaWVzOiBBcnJheTxzdHJpbmc+ID0gW107XG5cdEBJbnB1dCgpIGVuYWJsZVBsYWNlaG9sZGVyID0gdHJ1ZTtcblx0QElucHV0KCkgY3NzQ2xhc3MgPSAnZm9ybS1jb250cm9sJztcblx0QElucHV0KCkgb25seUNvdW50cmllczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuXHRASW5wdXQoKSBlbmFibGVBdXRvQ291bnRyeVNlbGVjdCA9IHRydWU7XG5cdEBJbnB1dCgpIHNlYXJjaENvdW50cnlGbGFnID0gZmFsc2U7XG5cdEBJbnB1dCgpIHNlYXJjaENvdW50cnlGaWVsZDogU2VhcmNoQ291bnRyeUZpZWxkW10gPSBbU2VhcmNoQ291bnRyeUZpZWxkLkFsbF07XG5cdEBJbnB1dCgpIHNlYXJjaENvdW50cnlQbGFjZWhvbGRlciA9ICdTZWFyY2ggQ291bnRyeSc7XG5cdEBJbnB1dCgpIG1heExlbmd0aCA9ICcnO1xuXHRASW5wdXQoKSB0b29sdGlwRmllbGQ6IFRvb2x0aXBMYWJlbDtcblx0QElucHV0KCkgc2VsZWN0Rmlyc3RDb3VudHJ5ID0gdHJ1ZTtcblx0QElucHV0KCkgc2VsZWN0ZWRDb3VudHJ5SVNPOiBDb3VudHJ5SVNPO1xuXHRASW5wdXQoKSBwaG9uZVZhbGlkYXRpb24gPSB0cnVlO1xuXG5cdEBPdXRwdXQoKSByZWFkb25seSBjb3VudHJ5Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxDb3VudHJ5PigpO1xuXG5cdHNlbGVjdGVkQ291bnRyeTogQ291bnRyeSA9IHtcblx0XHRhcmVhQ29kZXM6IHVuZGVmaW5lZCxcblx0XHRkaWFsQ29kZTogJycsXG5cdFx0ZmxhZ0NsYXNzOiAnJyxcblx0XHRpc28yOiAnJyxcblx0XHRuYW1lOiAnJyxcblx0XHRwbGFjZUhvbGRlcjogJycsXG5cdFx0cHJpb3JpdHk6IDBcblx0fTtcblxuXHQvLyBkaXNwbGF5IHRoZSBjb3VudHJ5IGRpYWwgY29kZSBuZXh0IHRvIHRoZSBzZWxlY3RlZCBmbGFnXG5cdEBJbnB1dCgpIHNlcGFyYXRlRGlhbENvZGUgPSBmYWxzZTtcblx0c2VwYXJhdGVEaWFsQ29kZUNsYXNzOiBzdHJpbmc7XG5cblx0cGhvbmVOdW1iZXIgPSAnJztcblx0YWxsQ291bnRyaWVzOiBBcnJheTxDb3VudHJ5PiA9IFtdO1xuXHRwcmVmZXJyZWRDb3VudHJpZXNJbkRyb3BEb3duOiBBcnJheTxDb3VudHJ5PiA9IFtdO1xuXHQvLyBIYXMgdG8gYmUgJ2FueScgdG8gcHJldmVudCBhIG5lZWQgdG8gaW5zdGFsbCBAdHlwZXMvZ29vZ2xlLWxpYnBob25lbnVtYmVyIGJ5IHRoZSBwYWNrYWdlIHVzZXIuLi5cblx0cGhvbmVVdGlsOiBhbnkgPSBscG4uUGhvbmVOdW1iZXJVdGlsLmdldEluc3RhbmNlKCk7XG5cdGRpc2FibGVkID0gZmFsc2U7XG5cdGVycm9yczogQXJyYXk8YW55PiA9IFsnUGhvbmUgbnVtYmVyIGlzIHJlcXVpcmVkLiddO1xuXHRjb3VudHJ5U2VhcmNoVGV4dCA9ICcnO1xuXG5cdEBWaWV3Q2hpbGQoJ2NvdW50cnlMaXN0JywgeyBzdGF0aWM6IGZhbHNlIH0pIGNvdW50cnlMaXN0OiBFbGVtZW50UmVmO1xuXG5cdG9uVG91Y2hlZCA9ICgpID0+IHsgfTtcblx0cHJvcGFnYXRlQ2hhbmdlID0gKF86IGFueSkgPT4geyB9O1xuXG5cdGNvbnN0cnVjdG9yKFxuXHRcdHByaXZhdGUgY291bnRyeUNvZGVEYXRhOiBDb3VudHJ5Q29kZVxuXHQpIHsgfVxuXG5cdG5nT25Jbml0KCkge1xuXHRcdHRoaXMuZmV0Y2hDb3VudHJ5RGF0YSgpO1xuXHRcdGlmICh0aGlzLnByZWZlcnJlZENvdW50cmllcy5sZW5ndGgpIHtcblx0XHRcdHRoaXMuZ2V0UHJlZmVycmVkQ291bnRyaWVzKCk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLm9ubHlDb3VudHJpZXMubGVuZ3RoKSB7XG5cdFx0XHR0aGlzLmFsbENvdW50cmllcyA9IHRoaXMuYWxsQ291bnRyaWVzLmZpbHRlcihjID0+IHRoaXMub25seUNvdW50cmllcy5pbmNsdWRlcyhjLmlzbzIpKTtcblx0XHR9XG5cdFx0aWYgKHRoaXMuc2VsZWN0Rmlyc3RDb3VudHJ5KSB7XG5cdFx0XHRpZiAodGhpcy5wcmVmZXJyZWRDb3VudHJpZXNJbkRyb3BEb3duLmxlbmd0aCkge1xuXHRcdFx0XHR0aGlzLnNldFNlbGVjdGVkQ291bnRyeSh0aGlzLnByZWZlcnJlZENvdW50cmllc0luRHJvcERvd25bMF0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5zZXRTZWxlY3RlZENvdW50cnkodGhpcy5hbGxDb3VudHJpZXNbMF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLmdldFNlbGVjdGVkQ291bnRyeSgpO1xuXHRcdHRoaXMuY2hlY2tTZXBhcmF0ZURpYWxDb2RlU3R5bGUoKTtcblx0fVxuXG5cdG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcblx0XHRpZiAodGhpcy5hbGxDb3VudHJpZXMgJiYgY2hhbmdlc1snc2VsZWN0ZWRDb3VudHJ5SVNPJ11cblx0XHRcdCYmIGNoYW5nZXNbJ3NlbGVjdGVkQ291bnRyeUlTTyddLmN1cnJlbnRWYWx1ZSAhPT0gY2hhbmdlc1snc2VsZWN0ZWRDb3VudHJ5SVNPJ10ucHJldmlvdXNWYWx1ZSkge1xuXHRcdFx0dGhpcy5nZXRTZWxlY3RlZENvdW50cnkoKTtcblx0XHR9XG5cdFx0aWYgKGNoYW5nZXMucHJlZmVycmVkQ291bnRyaWVzKSB7XG5cdFx0XHR0aGlzLmdldFByZWZlcnJlZENvdW50cmllcygpO1xuXHRcdH1cdFx0XG5cdFx0dGhpcy5jaGVja1NlcGFyYXRlRGlhbENvZGVTdHlsZSgpO1xuXHR9XG5cblx0Z2V0UHJlZmVycmVkQ291bnRyaWVzKCkge1xuXHRcdGlmICh0aGlzLnByZWZlcnJlZENvdW50cmllcy5sZW5ndGgpIHtcblx0XHRcdHRoaXMucHJlZmVycmVkQ291bnRyaWVzSW5Ecm9wRG93biA9IFtdO1xuXHRcdFx0dGhpcy5wcmVmZXJyZWRDb3VudHJpZXMuZm9yRWFjaChpc28yID0+IHtcblx0XHRcdFx0Y29uc3QgcHJlZmVycmVkQ291bnRyeSA9IHRoaXMuYWxsQ291bnRyaWVzLmZpbHRlcigoYykgPT4ge1xuXHRcdFx0XHRcdHJldHVybiBjLmlzbzIgPT09IGlzbzI7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHRoaXMucHJlZmVycmVkQ291bnRyaWVzSW5Ecm9wRG93bi5wdXNoKHByZWZlcnJlZENvdW50cnlbMF0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0U2VsZWN0ZWRDb3VudHJ5KCkge1xuXHRcdGlmICh0aGlzLnNlbGVjdGVkQ291bnRyeUlTTykge1xuXHRcdFx0dGhpcy5zZWxlY3RlZENvdW50cnkgPSB0aGlzLmFsbENvdW50cmllcy5maW5kKGMgPT4geyByZXR1cm4gKGMuaXNvMi50b0xvd2VyQ2FzZSgpID09PSB0aGlzLnNlbGVjdGVkQ291bnRyeUlTTy50b0xvd2VyQ2FzZSgpKTsgfSk7XG5cdFx0XHRpZiAodGhpcy5zZWxlY3RlZENvdW50cnkpIHtcblx0XHRcdFx0aWYgKHRoaXMucGhvbmVOdW1iZXIpIHtcblx0XHRcdFx0XHR0aGlzLm9uUGhvbmVOdW1iZXJDaGFuZ2UoKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLnByb3BhZ2F0ZUNoYW5nZSh1bmRlZmluZWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0c2V0U2VsZWN0ZWRDb3VudHJ5KGNvdW50cnk6IENvdW50cnkpIHtcblx0XHR0aGlzLnNlbGVjdGVkQ291bnRyeSA9IGNvdW50cnk7XG5cdFx0dGhpcy5jb3VudHJ5Q2hhbmdlLmVtaXQoY291bnRyeSk7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBTZWFyY2ggY291bnRyeSBiYXNlZCBvbiBjb3VudHJ5IG5hbWUsIGlzbzIsIGRpYWxDb2RlIG9yIGFsbCBvZiB0aGVtLlxuXHQgKi9cblx0c2VhcmNoQ291bnRyeSgpIHtcblx0XHRpZiAoIXRoaXMuY291bnRyeVNlYXJjaFRleHQpIHtcblx0XHRcdHRoaXMuY291bnRyeUxpc3QubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdsaScpLnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6ICdzbW9vdGgnIH0pO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRjb25zdCBjb3VudHJ5U2VhcmNoVGV4dExvd2VyID0gdGhpcy5jb3VudHJ5U2VhcmNoVGV4dC50b0xvd2VyQ2FzZSgpO1xuXHRcdGNvbnN0IGNvdW50cnkgPSB0aGlzLmFsbENvdW50cmllcy5maWx0ZXIoYyA9PiB7XG5cdFx0XHRpZiAodGhpcy5zZWFyY2hDb3VudHJ5RmllbGQuaW5kZXhPZihTZWFyY2hDb3VudHJ5RmllbGQuQWxsKSA+IC0xKSB7XG5cdFx0XHRcdC8vIFNlYXJjaCBpbiBhbGwgZmllbGRzXG5cdFx0XHRcdGlmIChjLmlzbzIudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKGNvdW50cnlTZWFyY2hUZXh0TG93ZXIpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGM7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGMubmFtZS50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoY291bnRyeVNlYXJjaFRleHRMb3dlcikpIHtcblx0XHRcdFx0XHRyZXR1cm4gYztcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoYy5kaWFsQ29kZS5zdGFydHNXaXRoKHRoaXMuY291bnRyeVNlYXJjaFRleHQpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGM7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIE9yIHNlYXJjaCBieSBzcGVjaWZpYyBTZWFyY2hDb3VudHJ5RmllbGQocylcblx0XHRcdFx0aWYgKHRoaXMuc2VhcmNoQ291bnRyeUZpZWxkLmluZGV4T2YoU2VhcmNoQ291bnRyeUZpZWxkLklzbzIpID4gLTEpIHtcblx0XHRcdFx0XHRpZiAoYy5pc28yLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aChjb3VudHJ5U2VhcmNoVGV4dExvd2VyKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGM7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICh0aGlzLnNlYXJjaENvdW50cnlGaWVsZC5pbmRleE9mKFNlYXJjaENvdW50cnlGaWVsZC5OYW1lKSA+IC0xKSB7XG5cdFx0XHRcdFx0aWYgKGMubmFtZS50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoY291bnRyeVNlYXJjaFRleHRMb3dlcikpIHtcblx0XHRcdFx0XHRcdHJldHVybiBjO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodGhpcy5zZWFyY2hDb3VudHJ5RmllbGQuaW5kZXhPZihTZWFyY2hDb3VudHJ5RmllbGQuRGlhbENvZGUpID4gLTEpIHtcblx0XHRcdFx0XHRpZiAoYy5kaWFsQ29kZS5zdGFydHNXaXRoKHRoaXMuY291bnRyeVNlYXJjaFRleHQpKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gYztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGlmIChjb3VudHJ5Lmxlbmd0aCA+IDApIHtcblx0XHRcdGNvbnN0IGVsID0gdGhpcy5jb3VudHJ5TGlzdC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnICsgY291bnRyeVswXS5pc28yKTtcblx0XHRcdGlmIChlbCkge1xuXHRcdFx0XHRlbC5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiAnc21vb3RoJyB9KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLmNoZWNrU2VwYXJhdGVEaWFsQ29kZVN0eWxlKCk7XG5cdH1cblxuXHRwdWJsaWMgb25QaG9uZU51bWJlckNoYW5nZSgpOiB2b2lkIHtcblx0XHR0aGlzLnZhbHVlID0gdGhpcy5waG9uZU51bWJlcjtcblxuXHRcdGxldCBudW1iZXI6IGxwbi5QaG9uZU51bWJlcjtcblx0XHR0cnkge1xuXHRcdFx0bnVtYmVyID0gdGhpcy5waG9uZVV0aWwucGFyc2UodGhpcy5waG9uZU51bWJlciwgdGhpcy5zZWxlY3RlZENvdW50cnkuaXNvMi50b1VwcGVyQ2FzZSgpKTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0fVxuXG5cdFx0bGV0IGNvdW50cnlDb2RlID0gdGhpcy5zZWxlY3RlZENvdW50cnkuaXNvMjtcblx0XHQvLyBhdXRvIHNlbGVjdCBjb3VudHJ5IGJhc2VkIG9uIHRoZSBleHRlbnNpb24gKGFuZCBhcmVhQ29kZSBpZiBuZWVkZWQpIChlLmcgc2VsZWN0IENhbmFkYSBpZiBudW1iZXIgc3RhcnRzIHdpdGggKzEgNDE2KVxuXHRcdGlmICh0aGlzLmVuYWJsZUF1dG9Db3VudHJ5U2VsZWN0KSB7XG5cdFx0XHRjb3VudHJ5Q29kZSA9IG51bWJlciAmJiBudW1iZXIuZ2V0Q291bnRyeUNvZGUoKVxuXHRcdFx0XHQ/IHRoaXMuZ2V0Q291bnRyeUlzb0NvZGUobnVtYmVyLmdldENvdW50cnlDb2RlKCksIG51bWJlcilcblx0XHRcdFx0OiB0aGlzLnNlbGVjdGVkQ291bnRyeS5pc28yO1xuXHRcdFx0aWYgKGNvdW50cnlDb2RlICYmIGNvdW50cnlDb2RlICE9PSB0aGlzLnNlbGVjdGVkQ291bnRyeS5pc28yKSB7XG5cdFx0XHRcdGNvbnN0IG5ld0NvdW50cnkgPSB0aGlzLmFsbENvdW50cmllcy5maW5kKGMgPT4gYy5pc28yID09PSBjb3VudHJ5Q29kZSk7XG5cdFx0XHRcdGlmIChuZXdDb3VudHJ5KSB7XG5cdFx0XHRcdFx0dGhpcy5zZWxlY3RlZENvdW50cnkgPSBuZXdDb3VudHJ5O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGNvdW50cnlDb2RlID0gY291bnRyeUNvZGUgPyBjb3VudHJ5Q29kZSA6IHRoaXMuc2VsZWN0ZWRDb3VudHJ5LmlzbzI7XG5cblx0XHR0aGlzLmNoZWNrU2VwYXJhdGVEaWFsQ29kZVN0eWxlKCk7XG5cblx0XHRpZiAoIXRoaXMudmFsdWUpIHtcblx0XHRcdC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1udWxsLWtleXdvcmRcblx0XHRcdHRoaXMucHJvcGFnYXRlQ2hhbmdlKG51bGwpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgaW50bE5vID0gbnVtYmVyID8gdGhpcy5waG9uZVV0aWwuZm9ybWF0KG51bWJlciwgbHBuLlBob25lTnVtYmVyRm9ybWF0LklOVEVSTkFUSU9OQUwpIDogJyc7XG5cblx0XHRcdC8vIHBhcnNlIHBob25lTnVtYmVyIGlmIHNlcGFyYXRlIGRpYWwgY29kZSBpcyBuZWVkZWRcblx0XHRcdGlmICh0aGlzLnNlcGFyYXRlRGlhbENvZGUgJiYgaW50bE5vKSB7XG5cdFx0XHRcdHRoaXMucGhvbmVOdW1iZXIgPSB0aGlzLnJlbW92ZURpYWxDb2RlKGludGxObyk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMucHJvcGFnYXRlQ2hhbmdlKHtcblx0XHRcdFx0bnVtYmVyOiB0aGlzLnZhbHVlLFxuXHRcdFx0XHRpbnRlcm5hdGlvbmFsTnVtYmVyOiBpbnRsTm8sXG5cdFx0XHRcdG5hdGlvbmFsTnVtYmVyOiBudW1iZXIgPyB0aGlzLnBob25lVXRpbC5mb3JtYXQobnVtYmVyLCBscG4uUGhvbmVOdW1iZXJGb3JtYXQuTkFUSU9OQUwpIDogJycsXG5cdFx0XHRcdGNvdW50cnlDb2RlOiBjb3VudHJ5Q29kZS50b1VwcGVyQ2FzZSgpLFxuXHRcdFx0XHRkaWFsQ29kZTogJysnICsgdGhpcy5zZWxlY3RlZENvdW50cnkuZGlhbENvZGVcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdHB1YmxpYyBvbkNvdW50cnlTZWxlY3QoY291bnRyeTogQ291bnRyeSwgZWwpOiB2b2lkIHtcblx0XHR0aGlzLnNldFNlbGVjdGVkQ291bnRyeShjb3VudHJ5KTtcblxuXHRcdHRoaXMuY2hlY2tTZXBhcmF0ZURpYWxDb2RlU3R5bGUoKTtcblxuXHRcdGlmICh0aGlzLnBob25lTnVtYmVyICE9IG51bGwgJiYgdGhpcy5waG9uZU51bWJlci5sZW5ndGggPiAwKSB7XG5cdFx0XHR0aGlzLnZhbHVlID0gdGhpcy5waG9uZU51bWJlcjtcblxuXHRcdFx0bGV0IG51bWJlcjogbHBuLlBob25lTnVtYmVyO1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0bnVtYmVyID0gdGhpcy5waG9uZVV0aWwucGFyc2UodGhpcy5waG9uZU51bWJlciwgdGhpcy5zZWxlY3RlZENvdW50cnkuaXNvMi50b1VwcGVyQ2FzZSgpKTtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGludGxObyA9IG51bWJlciA/IHRoaXMucGhvbmVVdGlsLmZvcm1hdChudW1iZXIsIGxwbi5QaG9uZU51bWJlckZvcm1hdC5JTlRFUk5BVElPTkFMKSA6ICcnO1xuXG5cdFx0XHQvLyBwYXJzZSBwaG9uZU51bWJlciBpZiBzZXBhcmF0ZSBkaWFsIGNvZGUgaXMgbmVlZGVkXG5cdFx0XHRpZiAodGhpcy5zZXBhcmF0ZURpYWxDb2RlICYmIGludGxObykge1xuXHRcdFx0XHR0aGlzLnBob25lTnVtYmVyID0gdGhpcy5yZW1vdmVEaWFsQ29kZShpbnRsTm8pO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnByb3BhZ2F0ZUNoYW5nZSh7XG5cdFx0XHRcdG51bWJlcjogdGhpcy52YWx1ZSxcblx0XHRcdFx0aW50ZXJuYXRpb25hbE51bWJlcjogaW50bE5vLFxuXHRcdFx0XHRuYXRpb25hbE51bWJlcjogbnVtYmVyID8gdGhpcy5waG9uZVV0aWwuZm9ybWF0KG51bWJlciwgbHBuLlBob25lTnVtYmVyRm9ybWF0Lk5BVElPTkFMKSA6ICcnLFxuXHRcdFx0XHRjb3VudHJ5Q29kZTogdGhpcy5zZWxlY3RlZENvdW50cnkuaXNvMi50b1VwcGVyQ2FzZSgpLFxuXHRcdFx0XHRkaWFsQ29kZTogJysnICsgdGhpcy5zZWxlY3RlZENvdW50cnkuZGlhbENvZGVcblx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnByb3BhZ2F0ZUNoYW5nZShudWxsKTtcblx0XHR9XG5cblx0XHRlbC5mb2N1cygpO1xuXHR9XG5cblx0cHVibGljIG9uSW5wdXRLZXlQcmVzcyhldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuXHRcdGNvbnN0IGFsbG93ZWRDaGFycyA9IC9bMC05XFwrXFwtXFwgXS87XG5cdFx0Y29uc3QgYWxsb3dlZEN0cmxDaGFycyA9IC9bYXhjdl0vOyAvLyBBbGxvd3MgY29weS1wYXN0aW5nXG5cdFx0Y29uc3QgYWxsb3dlZE90aGVyS2V5cyA9IFtcblx0XHRcdCdBcnJvd0xlZnQnLCAnQXJyb3dVcCcsICdBcnJvd1JpZ2h0JywgJ0Fycm93RG93bicsXG5cdFx0XHQnSG9tZScsICdFbmQnLCAnSW5zZXJ0JywgJ0RlbGV0ZScsICdCYWNrc3BhY2UnXG5cdFx0XTtcblxuXHRcdGlmICghYWxsb3dlZENoYXJzLnRlc3QoZXZlbnQua2V5KVxuXHRcdFx0JiYgIShldmVudC5jdHJsS2V5ICYmIGFsbG93ZWRDdHJsQ2hhcnMudGVzdChldmVudC5rZXkpKVxuXHRcdFx0JiYgIShhbGxvd2VkT3RoZXJLZXlzLmluY2x1ZGVzKGV2ZW50LmtleSkpKSB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdH1cblx0fVxuXG5cdHByb3RlY3RlZCBmZXRjaENvdW50cnlEYXRhKCk6IHZvaWQge1xuXHRcdHRoaXMuY291bnRyeUNvZGVEYXRhLmFsbENvdW50cmllcy5mb3JFYWNoKGMgPT4ge1xuXHRcdFx0Y29uc3QgY291bnRyeTogQ291bnRyeSA9IHtcblx0XHRcdFx0bmFtZTogY1swXS50b1N0cmluZygpLFxuXHRcdFx0XHRpc28yOiBjWzFdLnRvU3RyaW5nKCksXG5cdFx0XHRcdGRpYWxDb2RlOiBjWzJdLnRvU3RyaW5nKCksXG5cdFx0XHRcdHByaW9yaXR5OiArY1szXSB8fCAwLFxuXHRcdFx0XHRhcmVhQ29kZXM6IGNbNF0gYXMgc3RyaW5nW10gfHwgdW5kZWZpbmVkLFxuXHRcdFx0XHRmbGFnQ2xhc3M6IGNbMV0udG9TdHJpbmcoKS50b0xvY2FsZUxvd2VyQ2FzZSgpLFxuXHRcdFx0XHRwbGFjZUhvbGRlcjogJydcblx0XHRcdH07XG5cblx0XHRcdGlmICh0aGlzLmVuYWJsZVBsYWNlaG9sZGVyKSB7XG5cdFx0XHRcdGNvdW50cnkucGxhY2VIb2xkZXIgPSB0aGlzLmdldFBob25lTnVtYmVyUGxhY2VIb2xkZXIoY291bnRyeS5pc28yLnRvVXBwZXJDYXNlKCkpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLmFsbENvdW50cmllcy5wdXNoKGNvdW50cnkpO1xuXHRcdH0pO1xuXHR9XG5cblx0cHJvdGVjdGVkIGdldFBob25lTnVtYmVyUGxhY2VIb2xkZXIoY291bnRyeUNvZGU6IHN0cmluZyk6IHN0cmluZyB7XG5cdFx0dHJ5IHtcblx0XHRcdHJldHVybiB0aGlzLnBob25lVXRpbC5mb3JtYXQodGhpcy5waG9uZVV0aWwuZ2V0RXhhbXBsZU51bWJlcihjb3VudHJ5Q29kZSksIGxwbi5QaG9uZU51bWJlckZvcm1hdC5JTlRFUk5BVElPTkFMKTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRyZXR1cm4gZTtcblx0XHR9XG5cdH1cblxuXHRyZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcblx0XHR0aGlzLnByb3BhZ2F0ZUNoYW5nZSA9IGZuO1xuXHR9XG5cblx0cmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuXHRcdHRoaXMub25Ub3VjaGVkID0gZm47XG5cdH1cblxuXHRzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcblx0XHR0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcblx0fVxuXG5cdHdyaXRlVmFsdWUob2JqOiBhbnkpOiB2b2lkIHtcblx0XHRpZiAob2JqID09IG51bGwpIHtcblx0XHRcdHRoaXMubmdPbkluaXQoKTtcblx0XHR9XG5cdFx0dGhpcy5waG9uZU51bWJlciA9IG9iajtcblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdHRoaXMub25QaG9uZU51bWJlckNoYW5nZSgpO1xuXHRcdH0sIDEpO1xuXHR9XG5cblx0cHJpdmF0ZSBnZXRDb3VudHJ5SXNvQ29kZShjb3VudHJ5Q29kZTogbnVtYmVyLCBudW1iZXI6IGxwbi5QaG9uZU51bWJlcik6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG5cdFx0Ly8gV2lsbCB1c2UgdGhpcyB0byBtYXRjaCBhcmVhIGNvZGUgZnJvbSB0aGUgZmlyc3QgbnVtYmVyc1xuXHRcdGNvbnN0IHJhd051bWJlciA9IG51bWJlclsndmFsdWVzXyddWycyJ10udG9TdHJpbmcoKTtcblx0XHQvLyBMaXN0IG9mIGFsbCBjb3VudHJpZXMgd2l0aCBjb3VudHJ5Q29kZSAoY2FuIGJlIG1vcmUgdGhhbiBvbmUuIGUueC4gVVMsIENBLCBETywgUFIgYWxsIGhhdmUgKzEgY291bnRyeUNvZGUpXG5cdFx0Y29uc3QgY291bnRyaWVzID0gdGhpcy5hbGxDb3VudHJpZXMuZmlsdGVyKGMgPT4gYy5kaWFsQ29kZSA9PT0gY291bnRyeUNvZGUudG9TdHJpbmcoKSk7XG5cdFx0Ly8gTWFpbiBjb3VudHJ5IGlzIHRoZSBjb3VudHJ5LCB3aGljaCBoYXMgbm8gYXJlYUNvZGVzIHNwZWNpZmllZCBpbiBjb3VudHJ5LWNvZGUudHMgZmlsZS5cblx0XHRjb25zdCBtYWluQ291bnRyeSA9IGNvdW50cmllcy5maW5kKGMgPT4gYy5hcmVhQ29kZXMgPT09IHVuZGVmaW5lZCk7XG5cdFx0Ly8gU2Vjb25kYXJ5IGNvdW50cmllcyBhcmUgYWxsIGNvdW50cmllcywgd2hpY2ggaGF2ZSBhcmVhQ29kZXMgc3BlY2lmaWVkIGluIGNvdW50cnktY29kZS50cyBmaWxlLlxuXHRcdGNvbnN0IHNlY29uZGFyeUNvdW50cmllcyA9IGNvdW50cmllcy5maWx0ZXIoYyA9PiBjLmFyZWFDb2RlcyAhPT0gdW5kZWZpbmVkKTtcblx0XHRsZXQgbWF0Y2hlZENvdW50cnkgPSBtYWluQ291bnRyeSA/IG1haW5Db3VudHJ5LmlzbzIgOiB1bmRlZmluZWQ7XG5cblx0XHQvKlxuXHRcdFx0SW50ZXJhdGUgb3ZlciBlYWNoIHNlY29uZGFyeSBjb3VudHJ5IGFuZCBjaGVjayBpZiBuYXRpb25hbE51bWJlciBzdGFydHMgd2l0aCBhbnkgb2YgYXJlYUNvZGVzIGF2YWlsYWJsZS5cblx0XHRcdElmIG5vIG1hdGNoZXMgZm91bmQsIGZhbGxiYWNrIHRvIHRoZSBtYWluIGNvdW50cnkuXG5cdFx0Ki9cblx0XHRzZWNvbmRhcnlDb3VudHJpZXMuZm9yRWFjaChjb3VudHJ5ID0+IHtcblx0XHRcdGNvdW50cnkuYXJlYUNvZGVzLmZvckVhY2goYXJlYUNvZGUgPT4ge1xuXHRcdFx0XHRpZiAocmF3TnVtYmVyLnN0YXJ0c1dpdGgoYXJlYUNvZGUpKSB7XG5cdFx0XHRcdFx0bWF0Y2hlZENvdW50cnkgPSBjb3VudHJ5LmlzbzI7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIG1hdGNoZWRDb3VudHJ5O1xuXHR9XG5cblx0c2VwYXJhdGVEaWFsQ29kZVBsYWNlSG9sZGVyKHBsYWNlaG9sZGVyOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdHJldHVybiB0aGlzLnJlbW92ZURpYWxDb2RlKHBsYWNlaG9sZGVyKTtcblx0fVxuXG5cdHByaXZhdGUgcmVtb3ZlRGlhbENvZGUocGhvbmVOdW1iZXI6IHN0cmluZyk6IHN0cmluZyB7XG5cdFx0aWYgKHRoaXMuc2VwYXJhdGVEaWFsQ29kZSAmJiBwaG9uZU51bWJlcikge1xuXHRcdFx0cGhvbmVOdW1iZXIgPSBwaG9uZU51bWJlci5zdWJzdHIocGhvbmVOdW1iZXIuaW5kZXhPZignICcpICsgMSk7XG5cdFx0fVxuXHRcdHJldHVybiBwaG9uZU51bWJlcjtcblx0fVxuXG5cdC8vIGFkanVzdCBpbnB1dCBhbGlnbm1lbnRcblx0cHJpdmF0ZSBjaGVja1NlcGFyYXRlRGlhbENvZGVTdHlsZSgpIHtcblx0XHRpZiAodGhpcy5zZXBhcmF0ZURpYWxDb2RlICYmIHRoaXMuc2VsZWN0ZWRDb3VudHJ5KSB7XG5cdFx0XHR2YXIgY250cnlDZCA9IHRoaXMuc2VsZWN0ZWRDb3VudHJ5LmRpYWxDb2RlO1xuXHRcdFx0dGhpcy5zZXBhcmF0ZURpYWxDb2RlQ2xhc3MgPSAnc2VwYXJhdGUtZGlhbC1jb2RlIGl0aS1zZGMtJyArIChjbnRyeUNkLmxlbmd0aCArIDEpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNlcGFyYXRlRGlhbENvZGVDbGFzcyA9ICcnO1xuXHRcdH1cblx0fVxuXG59XG4iXX0=