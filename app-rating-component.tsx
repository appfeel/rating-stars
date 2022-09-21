/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Component, Prop, State, h, Event, EventEmitter } from '@stencil/core';

import Logger from '../../helpers/logger';

@Component({
    tag: 'app-rating-component',
    styleUrl: 'app-rating-component.css',
    shadow: true,
})
export class MyRatingComponent {
    /** Maxim nombre d'estrelles */
    @Prop() maxValue = 5;
    /** Valor del rating */
    @Prop({ mutable: true }) value = 0;

    @State() starList: Array<Record<string, unknown>> = [];

    /** Event que s'emet quan es clicka una estrella */
    @Event() ratingUpdated: EventEmitter;

    logger: Logger = new Logger();

    componentWillLoad() {
        this.createStarList(this.value);
    }

    setValue(newValue) {
        this.value = newValue;
        this.createStarList(this.value);
        this.ratingUpdated.emit({ value: this.value });
    }

    createStarList(numberOfStars: number) {
        const starList = [];

        for (let i = 1; i <= this.maxValue; i += 1) {
            if (i <= numberOfStars) {
                starList.push(
                    <span
                        class="rating"
                        onMouseOver={() => this.createStarList(i)}
                        onFocus={e => this.logger.log(e)}
                        onMouseOut={() => this.createStarList(this.value)}
                        onBlur={e => this.logger.log(e)}
                        onClick={() => this.setValue(i)}
                    >
                        &#x2605;
                    </span>,
                );
            } else {
                starList.push(
                    <span
                        class="rating"
                        onMouseOver={() => this.createStarList(i)}
                        onFocus={e => this.logger.log(e)}
                        onMouseOut={() => this.createStarList(this.value)}
                        onBlur={e => this.logger.log(e)}
                        onClick={() => this.setValue(i)}
                    >
                        &#x2606;
                    </span>,
                );
            }
        }
        this.starList = starList;
    }

    render() {
        return <div>{this.starList}</div>;
    }
}
