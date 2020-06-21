import React from 'react';

let buttons = [
    {
        label: `I'm Selling`,
        value: "sell",
    },
    {
        label: `I'm Buying`,
        value: "buy",
    },
]

const radioGroupGenerator = ({ input: { onChange, value } }) => (
    <div>
        {
            buttons.map((button, i) => 
                <div>
                    <label key={i}>
                        <input  type="radio" 
                                class="nes-radio" 
                                name="type"
                                value={button.value}
                                onChange={onChange} />
                        <span>{button.label}</span>
                    </label>
                </div>    
            )
        }
    </div>
)

export default radioGroupGenerator;