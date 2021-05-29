'use strict';

module.exports = {
    "emptyData": {
        "_type": "RelistItViewModel",
        "title": {
            "textSpans": [
                {
                    "text": "Ship it"
                }
            ]
        }
    },
    "modules": {
        "relistItModule": {
            "_type": "RelistItViewModel",
            "title": {
                "textSpans": [
                    {
                        "text": "Relist it"
                    }
                ]
            },
            "seeAll": {
                "textSpans": [
                    {
                        "text": "See all (85)"
                    }
                ],
                "action": {
                    "type": "NAV",
                    "URL": "http://my.qa.ebay.com/ws/eBayISAPI.dll?MyEbayBeta&View=SellingNext&NewFilter=Selling&SubmitAction.ChangeFilter=x&CurrentPage=MyeBayNextSelling"
                }
            },
            "disclaimerText": {
                "textSpans": [
                    {
                        "text": "* Price ranges and recommendations are estimated based on similar items that reently sold. No guarantee of sale or sale price. Fees excluded."
                    }
                ]
            },
            "lineItems": [
                {
                    "_type": "MyeBaySellingListingSummary",
                    "listingId": "170010746236",
                    "title": {
                        "textSpans": [
                            {
                                "text": "US-Auction Item1491009085103-1491009085103"
                            }
                        ],
                        "action": {
                            "type": "NAV",
                            "trackingList": [],
                            "URL": "http://www.qa.ebay.com/itm/170010746236"
                        }
                    },
                    "image": {
                        "imageId": "70gAAOSwfmBY3v5K",
                        "originalSize": {
                            "height": 45,
                            "width": 110
                        },
                        "action": {
                            "type": "NAV",
                            "trackingList": [],
                            "URL": "http://www.qa.ebay.com/itm/170010746236"
                        },
                        "URL": "http://i1.qa.ebayimg.com/images/g/70gAAOSwfmBY3v5K/s-l140.jpg"
                    },
                    "displayPrice": {
                        "textSpans": [
                            {
                                "text": "$10.00",
                                "styles": [
                                    "BOLD"
                                ]
                            },
                            {
                                "text": "Free shipping"
                            }
                        ],
                        "accessibilityText": "$10.00 Free shipping",
                        "value": {
                            "value": 10,
                            "currency": "USD"
                        }
                    },
                    "displayTime": {
                        "textSpans": [
                            {
                                "text": "Ended on Jun 8"
                            }
                        ],
                        "value": {
                            "value": "2017-06-08T17:22:30.000Z"
                        }
                    },
                    "__me": {
                        "lineActions": {
                            "options": [
                                {
                                    "label": {
                                        "textSpans": [
                                            {
                                                "text": "Line Actions"
                                            }
                                        ]
                                    },
                                    "selections": [
                                        {
                                            "disabled": false,
                                            "selected": true,
                                            "label": {
                                                "textSpans": [
                                                    {
                                                        "text": "Relist",
                                                        "styles": [
                                                            "PROMOTED"
                                                        ]
                                                    }
                                                ],
                                                "action": {
                                                    "type": "OPERATION",
                                                    "URL": "javascript"
                                                },
                                                "value": "relist"
                                            },
                                            "default": false
                                        }
                                    ],
                                    "multiSelect": false,
                                    "delimiter": null,
                                    "paramName": null,
                                    "baseUrl": null
                                }
                            ]
                        },
                        "listingFormat": {
                            "textSpans": [
                                {
                                    "text": "AUCTION"
                                }
                            ]
                        },
                        "itemStats": {
                            "textSpans": [
                                {
                                    "text": "0 views, 0 watchers, 0 bids"
                                }
                            ]
                        },
                        "sellingSuggestion": {}
                    }
                },
                {
                    "_type": "MyeBaySellingListingSummary",
                    "listingId": "170010746954",
                    "title": {
                        "textSpans": [
                            {
                                "text": "Apple iPhone 6s - 16GB - Space Gray"
                            }
                        ],
                        "action": {
                            "type": "NAV",
                            "trackingList": [],
                            "URL": "http://www.qa.ebay.com/itm/170010746954"
                        }
                    },
                    "image": {
                        "imageId": "YWkAAOSwaGtZMKRK",
                        "originalSize": {
                            "height": 572,
                            "width": 572
                        },
                        "action": {
                            "type": "NAV",
                            "trackingList": [],
                            "URL": "http://www.qa.ebay.com/itm/170010746954"
                        },
                        "URL": "http://i1.qa.ebayimg.com/images/g/YWkAAOSwaGtZMKRK/s-l140.jpg"
                    },
                    "displayPrice": {
                        "textSpans": [
                            {
                                "text": "$15,000.00",
                                "styles": [
                                    "BOLD"
                                ]
                            },
                            {
                                "text": "Free shipping"
                            }
                        ],
                        "accessibilityText": "$15,000.00 Free shipping",
                        "value": {
                            "value": 15000,
                            "currency": "USD"
                        }
                    },
                    "displayTime": {
                        "textSpans": [
                            {
                                "text": "Ended on Jun 1"
                            }
                        ],
                        "value": {
                            "value": "2017-06-01T23:47:50.000Z"
                        }
                    },
                    "__me": {
                        "lineActions": {
                            "options": [
                                {
                                    "label": {
                                        "textSpans": [
                                            {
                                                "text": "Line Actions"
                                            }
                                        ]
                                    },
                                    "selections": [
                                        {
                                            "disabled": false,
                                            "selected": false,
                                            "label": {
                                                "textSpans": [
                                                    {
                                                        "text": "Accept &amp; relist instantly"
                                                    }
                                                ],
                                                "action": {
                                                    "type": "NAV",
                                                    "URL": "http://www.ebay.com"
                                                },
                                                "value": "applyRecommendation"
                                            },
                                            "default": false
                                        },
                                        {
                                            "disabled": false,
                                            "selected": false,
                                            "label": {
                                                "textSpans": [
                                                    {
                                                        "text": "Make changes myself"
                                                    }
                                                ],
                                                "action": {
                                                    "type": "OPERATION",
                                                    "URL": "javascript"
                                                },
                                                "value": "relist"
                                            },
                                            "default": false
                                        }
                                    ],
                                    "multiSelect": false,
                                    "delimiter": null,
                                    "paramName": null,
                                    "baseUrl": null
                                }
                            ]
                        },
                        "listingFormat": {
                            "textSpans": [
                                {
                                    "text": "FIXED_PRICE"
                                }
                            ]
                        },
                        "itemStats": {
                            "textSpans": [
                                {
                                    "text": "0 views, 0 watchers"
                                }
                            ]
                        },
                        "sellingSuggestion": {
                            "originalPrice": {
                                "textSpans": [
                                    {
                                        "text": "$15,000.00",
                                        "styles": [
                                            "DEFAULT"
                                        ]
                                    }
                                ],
                                "value": {
                                    "value": 15000,
                                    "currency": "USD"
                                }
                            },
                            "suggestedPrice": {
                                "textSpans": [
                                    {
                                        "text": "$13,500.00",
                                        "styles": [
                                            "POSITIVE"
                                        ]
                                    }
                                ],
                                "value": {
                                    "value": 13500,
                                    "currency": "USD"
                                }
                            },
                            "tipMessage": {
                                "textSpans": [
                                    {
                                        "text": "Relist it instantly with our recommendation: ",
                                        "styles": [
                                            "POSITIVE"
                                        ]
                                    },
                                    {
                                        "text": "Try lowering your price for a better chance of selling."
                                    }
                                ]
                            },
                            "disclaimerText": {
                                "textSpans": [
                                    {
                                        "text": "By clicking below, you agree to pay applicable fees."
                                    }
                                ]
                            }
                        }
                    }
                },
                {
                    "_type": "MyeBaySellingListingSummary",
                    "listingId": "170010696221",
                    "title": {
                        "textSpans": [
                            {
                                "text": "US-mWeb Auction item with local pickup only-1487964958986"
                            }
                        ],
                        "action": {
                            "type": "NAV",
                            "trackingList": [],
                            "URL": "http://www.qa.ebay.com/itm/170010696221"
                        }
                    },
                    "image": {
                        "originalSize": {
                            "height": 0,
                            "width": 0
                        },
                        "action": {
                            "type": "NAV",
                            "trackingList": [],
                            "URL": "http://www.qa.ebay.com/itm/170010696221"
                        },
                        "URL": "https://pics.ebaystatic.com/aw/pics/stockimage1.jpg"
                    },
                    "displayPrice": {
                        "textSpans": [
                            {
                                "text": "$1.00",
                                "styles": [
                                    "BOLD"
                                ]
                            },
                            {
                                "text": "Local pickup"
                            }
                        ],
                        "accessibilityText": "$1.00 Local pickup",
                        "value": {
                            "value": 1,
                            "currency": "USD"
                        }
                    },
                    "displayTime": {
                        "textSpans": [
                            {
                                "text": "Ended on May 18"
                            }
                        ],
                        "value": {
                            "value": "2017-05-18T16:44:45.000Z"
                        }
                    },
                    "__me": {
                        "lineActions": {
                            "options": [
                                {
                                    "label": {
                                        "textSpans": [
                                            {
                                                "text": "Line Actions"
                                            }
                                        ]
                                    },
                                    "selections": [
                                        {
                                            "disabled": false,
                                            "selected": true,
                                            "label": {
                                                "textSpans": [
                                                    {
                                                        "text": "Relist",
                                                        "styles": [
                                                            "PROMOTED"
                                                        ]
                                                    }
                                                ],
                                                "action": {
                                                    "type": "OPERATION",
                                                    "URL": "javascript"
                                                },
                                                "value": "relist"
                                            },
                                            "default": false
                                        }
                                    ],
                                    "multiSelect": false,
                                    "delimiter": null,
                                    "paramName": null,
                                    "baseUrl": null
                                }
                            ]
                        },
                        "listingFormat": {
                            "textSpans": [
                                {
                                    "text": "AUCTION"
                                }
                            ]
                        },
                        "itemStats": {
                            "textSpans": [
                                {
                                    "text": "0 views, 0 watchers, 1 bid"
                                }
                            ]
                        },
                        "sellingSuggestion": {}
                    }
                }
            ],
            "relistLoadingScreenContent": {
                "label": "relistLoadingScreen",
                "content": {
                    "loadingScreenText": {
                        "textSpans": [
                            {
                                "text": "If this takes more than a few seconds, you can "
                            },
                            {
                                "text": "go to your listing to edit.",
                                "action": {
                                    "type": "NAV",
                                    "URL": "http://cgi5.qa.ebay.com/ws/eBayISAPI.dll?SimilarListing&lMode=relist&itemId"
                                }
                            }
                        ]
                    }
                }
            },
            "relistLoadingScreenErrorContent": {
                "label": "relistLoadingErrorScreen",
                "content": {
                    "loadingScreenErrorActionText": {
                        "textSpans": [
                            {
                                "text": "Reload",
                                "action": {
                                    "type": "OPERATION",
                                    "URL": "javascript"
                                }
                            },
                            {
                                "text": " or "
                            },
                            {
                                "text": "go to the listing tool.",
                                "action": {
                                    "type": "NAV",
                                    "URL": "http://cgi5.qa.ebay.com/ws/eBayISAPI.dll?SimilarListing&lMode=relist&itemId"
                                }
                            }
                        ]
                    },
                    "loadingScreenErrorText": {
                        "textSpans": [
                            {
                                "text": "Oops, something went wrong."
                            }
                        ]
                    }
                }
            }
        }
    },
    "meta": {
        "sequence": [
            "relistItModule"
        ]
    }
};