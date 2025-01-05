export const scenarios = [
    [
        'Case #1',

        `[{"operation":"buy", "unit-cost":10.00, "quantity": 100},
        {"operation":"sell", "unit-cost":15.00, "quantity": 50},
        {"operation":"sell", "unit-cost":15.00, "quantity": 50}]`,

        [ [ { tax: 0 }, { tax: 0 }, { tax: 0 } ] ]
    ],
    [
        'Case #2',

        //input
        `[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},
        {"operation":"sell", "unit-cost":20.00, "quantity": 5000},
        {"operation":"sell", "unit-cost":5.00, "quantity": 5000}]`,

        // output
        [ [ { tax: 0 }, { tax: 10000 }, { tax: 0 } ] ]
    ],
    [
        'Case #1 + Case #2',
        // input
        `[{"operation":"buy", "unit-cost":10.00, "quantity": 100},
        {"operation":"sell", "unit-cost":15.00, "quantity": 50},
        {"operation":"sell", "unit-cost":15.00, "quantity": 50}]
        [{"operation":"buy", "unit-cost":10.00, "quantity": 10000},
        {"operation":"sell", "unit-cost":20.00, "quantity": 5000},
        {"operation":"sell", "unit-cost":5.00, "quantity": 5000}]`,
        // output
        [
            [ { tax: 0 }, { tax: 0 }, { tax: 0 } ],
            [ { tax: 0 }, { tax: 10000 }, { tax: 0 } ]
        ]
    ],
    [
        'Case #3',
        // input
        `[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},
        {"operation":"sell", "unit-cost":5.00, "quantity": 5000},
        {"operation":"sell", "unit-cost":20.00, "quantity": 3000}]`,
        // output
        [ [ { tax: 0 }, { tax: 0 }, { tax: 1000 } ] ]
    ],
    [
        'Case #4',
        // input
        `[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},
        {"operation":"buy", "unit-cost":25.00, "quantity": 5000},
        {"operation":"sell", "unit-cost":15.00, "quantity": 10000}]`,
        // output
        [ [ { tax: 0 }, { tax: 0 }, { tax: 0 } ] ]
    ],
    [
        'Case #5',
        // input
        `[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},
        {"operation":"buy", "unit-cost":25.00, "quantity": 5000},
        {"operation":"sell", "unit-cost":15.00, "quantity": 10000},
        {"operation":"sell", "unit-cost":25.00, "quantity": 5000}]`,
        // output
        [ [ { tax: 0 }, { tax: 0 }, { tax: 0 }, { tax: 10000 } ] ]
    ],
    [
        'Case #6',
        // input
        `[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},
        {"operation":"sell", "unit-cost":2.00, "quantity": 5000},
        {"operation":"sell", "unit-cost":20.00, "quantity": 2000},
        {"operation":"sell", "unit-cost":20.00, "quantity": 2000},
        {"operation":"sell", "unit-cost":25.00, "quantity": 1000}]`,
        // output
        [ [ { tax: 0 }, { tax: 0 }, { tax: 0 }, { tax: 0 }, { tax: 3000 } ] ]
    ],
    [
        'Case #7',
        // input
        `[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},
        {"operation":"sell", "unit-cost":2.00, "quantity": 5000},
        {"operation":"sell", "unit-cost":20.00, "quantity": 2000},
        {"operation":"sell", "unit-cost":20.00, "quantity": 2000},
        {"operation":"sell", "unit-cost":25.00, "quantity": 1000},
        {"operation":"buy", "unit-cost":20.00, "quantity": 10000},
        {"operation":"sell", "unit-cost":15.00, "quantity": 5000},
        {"operation":"sell", "unit-cost":30.00, "quantity": 4350},
        {"operation":"sell", "unit-cost":30.00, "quantity": 650}]`,
        // output
        [
            [
              { tax: 0 },
              { tax: 0 },
              { tax: 0 },
              { tax: 0 },
              { tax: 3000 },
              { tax: 0 },
              { tax: 0 },
              { tax: 3700 },
              { tax: 0 }
            ]
          ]
    ],
    [
        'Case #8',
        // input
        `[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},
        {"operation":"sell", "unit-cost":50.00, "quantity": 10000},
        {"operation":"buy", "unit-cost":20.00, "quantity": 10000},
        {"operation":"sell", "unit-cost":50.00, "quantity": 10000}]`,
        // output
        [ [ { tax: 0 }, { tax: 80000 }, { tax: 0 }, { tax: 60000 } ] ]
    ],
]
