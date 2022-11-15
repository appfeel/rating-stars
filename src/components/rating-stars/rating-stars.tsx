/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Component, Prop, State, h, Event, EventEmitter } from '@stencil/core';

@Component({
    tag: 'rating-stars',
    styleUrl: 'rating-stars.css',
    shadow: true,
})
export class RatingStars {
    /** Permite editar el valor */
    @Prop() isEditable = true;
    /** Maxim nombre d'estrelles */
    @Prop() maxValue = 5;
    /** Valor del rating */
    @Prop({ mutable: true }) value = 0;
    @Prop({ mutable: true }) color = 'orange';
    @State() starList: Array<Record<string, unknown>> = [];

    /** Event que s'emet quan es clicka una estrella */
    @Event() ratingUpdated: EventEmitter;

    componentWillLoad() {
        this.createStarList(this.value);
    }

    handleSetValue(newValue: number) {
        if (this.isEditable) {
            this.value = newValue;
            this.createStarList(this.value);
            this.ratingUpdated.emit({ value: this.value });
        }
    }

    handleChangeValue(newValue: number) {
        if (this.isEditable) {
            this.createStarList(newValue);
        }
    }

    createStarList(numberOfStars: number) {
        const starList = [];

        for (let i = 1; i <= this.maxValue; i += 1) {
            if (i <= numberOfStars) {
                starList.push(
                    <span
                        style={{ color: this.color }}
                        class="rating"
                        onMouseOver={() => this.handleChangeValue(i)}
                        onFocus={() => { }}
                        onMouseOut={() => this.handleChangeValue(this.value)}
                        onBlur={() => { }}
                        onClick={() => this.handleSetValue(i)}
                    >
                        &#x2605;
                    </span>,
                );
            } else {
                starList.push(
                    <span
                        style={{ color: this.color }}
                        class="rating"
                        onMouseOver={() => this.handleChangeValue(i)}
                        onFocus={() => { }}
                        onMouseOut={() => this.handleChangeValue(this.value)}
                        onBlur={() => { }}
                        onClick={() => this.handleSetValue(i)}
                    >
                        &#x2606;
                    </span>,
                );
            }
        }
        this.starList = starList;
        return starList;
    }

    render() {
        return <div>{this.starList}</div>;
    }
}
