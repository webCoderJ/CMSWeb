;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-bianji" viewBox="0 0 1000 1000">' +
    '' +
    '<path d="M851.3685 188.4422l-50.274-50.2779c-38.2537-38.2561-100.2802-38.2561-138.5369 0l-36.2439 36.2434 188.8159 188.813 36.239-36.2364C889.6232 288.7182 889.6232 226.6913 851.3685 188.4422zM324.6855 663.9638v-50.87150911681879l-68.5364-68.5295-4.9798 4.9806c-15.768 15.7643-25.0201 35.5699-27.7903 56.083l-14.5278 49.6463-9.9317 5.913-35.1716 165.0941 186.7602-32.6888 9.508-17.9268 60.2967-18.9541 1.1223-3.8244c6.6008-4.0023 12.8398-8.834 18.5422-14.5361l4.9888-4.9886L375.5611 663.9638H324.685500021986zM283.6686 517.0424l41.0159 41.0122v-0.37174795488658685h32.65423190850618v73.61808693705667h73.61518074504616v32.66185526213227h-0.3497775414836164l41.8824 41.8776 321.2867-321.2652L604.9513 195.7693 283.6686 517.0424z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-daochu" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M538.3997 124.544c-2.7505-2.5876-6.4532-4.1748-10.5267-4.1748s-7.7773 1.5862-10.5267 4.1748L297.3819 331.5569c-1.4838 1.3967-2.047 3.6076-1.2503 5.6156s2.7218 3.2328 4.7596 3.2328h142.304256v210.41049600000002c0 3.9311 1.4991 7.8623 4.4995 10.8605 2.9993 2.9993 6.9304 4.4995 10.8605 4.4995h138.607616c3.9311 0 7.8623-1.5002 10.8605-4.4995s4.4995-6.9304 4.4995-10.8605V340.40524800000003h142.306304c2.0378 0 3.9629-1.2237 4.7585-3.2328 0.7967-2.0081 0.2345-4.2189-1.2503-5.6156L538.3997 124.544zM945.5391 631.9872l-135.468-94.0339h-84.66432l142.0145 114.9235-156.1242-2.0388c-4.5199 0-11.0377 4.354-13.0918 8.0056l-43.3521 104.8781H400.864256l-43.351-104.8781c-2.0398-3.6516-8.5432-8.0056-13.0908-8.0056H189.205504l141.1052-112.8847H245.64736l-135.4557 94.0339c-21.1651 12.6771-33.8708 41.8908-28.1795 64.9595l25.1075 137.7556c5.6914 23.0554 30.8808 41.9052 55.9596 41.9052h729.560064c25.0665 0 50.2682-18.8498 55.9739-41.9052l25.0798-137.7556C979.3976 673.878 966.7195 644.6643 945.5391 631.9872z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-cha" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M890.642432 237.478912c2.404352 2.405376 3.892224 5.726208 3.890176 9.3952 0 3.666944-1.485824 6.987776-3.890176 9.394176l-256.707584 256.7168 255.429632 255.435776c2.404352 2.407424 3.892224 5.728256 3.892224 9.3952 0 3.667968-1.485824 6.987776-3.892224 9.392128l-103.436288 103.448576c-2.403328 2.404352-5.72416 3.893248-9.394176 3.893248-3.668992 0-6.990848-1.488896-9.394176-3.893248L511.685632 635.20768l-254.176256 254.173184c-2.404352 2.405376-5.725184 3.893248-9.394176 3.893248-3.667968 0-6.987776-1.487872-9.393152-3.893248l-103.435264-103.437312c-2.405376-2.403328-3.8912-5.723136-3.8912-9.392128 0-3.670016 1.485824-6.991872 3.8912-9.394176L389.462016 512.98816l-255.45216-255.456256c-2.404352-2.403328-3.8912-5.725184-3.890176-9.394176 0-3.670016 1.486848-6.991872 3.892224-9.3952l103.455744-103.435264c2.404352-2.404352 5.726208-3.8912 9.394176-3.8912s6.989824 1.486848 9.394176 3.892224l255.429632 255.44192 256.730112-256.717824c2.405376-2.403328 5.726208-3.8912 9.3952-3.8912s6.991872 1.487872 9.394176 3.892224L890.642432 237.478912z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-xiazai1" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M938.016 832q6.016 24-2.496 45.504t-26.496 38.016-44 26.016-56 9.504q-188.992 0.992-338.016 0.992l-340 0q-36 0-63.488-12.992t-44-32-22.016-41.504 1.504-40.512q6.016-14.016 12-28.992 4.992-12.992 12-29.504t15.008-33.504l38.016-92 114.016 0-43.008 126.016 644 0-43.008-126.016 108.992 0q20.992 51.008 38.016 92 7.008 18.016 14.016 35.008t12.512 30.496 8.992 23.008 3.488 10.496zM435.008 647.008q-19.008-22.016-43.488-55.008t-50.496-68-51.488-68.992-45.504-59.008q-23.008-27.008-18.016-44.512t34.016-17.504q16 0.992 43.008-0.512t44.992-1.504q20 0 24.992-12t4.992-32q0-22.016-0.512-48.512t-0.512-54.496-0.512-55.008-0.512-50.016q0-10.016 1.504-20.992t7.008-20 16-15.008 28.512-6.016q20.992 0 38.496-0.512t40.512-0.512q32.992 0 44.512 15.488t12.512 49.504l0 39.008q0 23.008 0.512 48.992t0.512 52l0 47.008q0 28.992 6.016 46.496t27.008 16.512q15.008 0 36.512 0.992t37.504 0.992q27.008 0 34.496 14.496t-10.496 37.504q-19.008 24-44 58.016t-51.488 70.496-52 71.008-45.504 59.488q-18.016 23.008-34.496 23.488t-34.496-21.504z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-bbgjianhao" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M850.159 399.281h-675c-31.067 0-56.25 25.183-56.25 56.25v112.5c0 31.067 25.183 56.25 56.25 56.25h675c31.067 0 56.25-25.183 56.25-56.25v-112.5c0-31.067-25.183-56.25-56.25-56.25z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-lianjie" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M607.934444 417.856853c-6.179746-6.1777-12.766768-11.746532-19.554358-16.910135l-0.01228 0.011256c-6.986111-6.719028-16.47216-10.857279-26.930349-10.857279-21.464871 0-38.864146 17.400299-38.864146 38.864146 0 9.497305 3.411703 18.196431 9.071609 24.947182l-0.001023 0c0.001023 0.001023 0.00307 0.00307 0.005117 0.004093 2.718925 3.242857 5.953595 6.03853 9.585309 8.251941 3.664459 3.021823 7.261381 5.997598 10.624988 9.361205l3.203972 3.204995c40.279379 40.229237 28.254507 109.539812-12.024871 149.820214L371.157763 796.383956c-40.278355 40.229237-105.761766 40.229237-146.042167 0l-3.229554-3.231601c-40.281425-40.278355-40.281425-105.809861 0-145.991002l75.93546-75.909877c9.742898-7.733125 15.997346-19.668968 15.997346-33.072233 0-23.312962-18.898419-42.211381-42.211381-42.211381-8.797363 0-16.963347 2.693342-23.725354 7.297197-0.021489-0.045025-0.044002-0.088004-0.066515-0.134053l-0.809435 0.757247c-2.989077 2.148943-5.691629 4.669346-8.025791 7.510044l-78.913281 73.841775c-74.178443 74.229608-74.178443 195.632609 0 269.758863l3.203972 3.202948c74.178443 74.127278 195.529255 74.127278 269.707698 0l171.829484-171.880649c74.076112-74.17435 80.357166-191.184297 6.282077-265.311575L607.934444 417.856853z"  ></path>' +
    '' +
    '<path d="M855.61957 165.804257l-3.203972-3.203972c-74.17742-74.178443-195.528232-74.178443-269.706675 0L410.87944 334.479911c-74.178443 74.178443-78.263481 181.296089-4.085038 255.522628l3.152806 3.104711c3.368724 3.367701 6.865361 6.54302 10.434653 9.588379 2.583848 2.885723 5.618974 5.355985 8.992815 7.309476 0.025583 0.020466 0.052189 0.041956 0.077771 0.062422l0.011256-0.010233c5.377474 3.092431 11.608386 4.870938 18.257829 4.870938 20.263509 0 36.68962-16.428158 36.68962-36.68962 0-5.719258-1.309832-11.132548-3.645017-15.95846l0 0c-4.850471-10.891048-13.930267-17.521049-20.210297-23.802102l-3.15383-3.102664c-40.278355-40.278355-24.982998-98.79612 15.295358-139.074476l171.930791-171.830507c40.179095-40.280402 105.685018-40.280402 145.965419 0l3.206018 3.152806c40.279379 40.281425 40.279379 105.838513 0 146.06775l-75.686796 75.737962c-10.296507 7.628748-16.97358 19.865443-16.97358 33.662681 0 23.12365 18.745946 41.87062 41.87062 41.87062 8.048303 0 15.563464-2.275833 21.944801-6.211469 0.048095 0.081864 0.093121 0.157589 0.141216 0.240477l1.173732-1.083681c3.616364-2.421142 6.828522-5.393847 9.529027-8.792247l79.766718-73.603345C929.798013 361.334535 929.798013 239.981676 855.61957 165.804257z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-6" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M65.472 65.472 447.36 65.472l0 381.824L65.472 447.296 65.472 65.472zM576.64 65.472l381.888 0 0 381.824L576.64 447.296 576.64 65.472zM65.472 576.64 447.36 576.64l0 381.888L65.472 958.528 65.472 576.64zM576.64 576.64l381.888 0 0 381.888L576.64 958.528 576.64 576.64z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-gerenziliao" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M799.934 908.564h-540.145c-28.431 0-51.453-23.327-51.453-52.080v-91.024h32.117c24.495 0 51.514-26.893 51.514-52.009v-22.797c0-25.117-27.017-48.782-51.514-48.782h-32.117v-65.034h32.117c24.495 0 51.514-21.987 51.514-47.143v-22.743c0-25.166-20.611-53.693-45.045-53.693h-38.583v-58.501h25.698c24.473 0 52.353-23.666 52.353-48.766v-22.798c0-25.111-27.884-52.026-52.353-52.026h-25.698v-91.075c0-28.701 23.026-52.009 51.453-52.009h540.145c28.391 0 51.405 23.308 51.405 52.009v676.406c-0.001 28.756-23.022 52.080-51.406 52.080v0zM702.188 598.306c-55.738-21.474-59.711-23.831-59.711-23.831s-13.010-21.475-19.057-22.869c-5.938-1.332-0.973-9.829 0-12.209 1.052-2.433 8.673 0 8.673-31.009 0-10.187-1.316-10.889 3.728-10.889 4.97 0 16.668-7.157 16.668-31.998 0-24.881 0-25.915-4.369-26.544-0.677-9.554 4.707-24.887 4.707-59.604-5.378-36.17-20.021-54.455-31.137-61.729-45.697-29.514 43.414-5.732-50.028-5.732-52.781 0-80.9 32.743-80.9 67.463 0 1.332 6.833 118.147 17.087 118.147 4.967 0 3.629 0.703 3.629 10.889 0 31.009 7.698 28.58 8.673 31.009 1.052 2.378 6.044 10.886 0 12.209-6.001 1.394-19.031 22.869-19.031 22.869s-3.997 2.366-59.767 23.831c-82.052 26.554-71.746 108.597-71.746 108.597h404.208c0.002 0.001 10.251-82.034-71.618-108.596v0zM266.207 329.713v6.479c0 21.588-17.295 39.065-38.583 39.065h-64.285c-21.315 0-38.602-17.478-38.602-39.065v-6.479c0-21.577 17.29-39.056 38.602-39.056h64.285c21.285 0 38.583 17.479 38.583 39.056v0zM169.744 472.797h64.288c21.338 0 38.583 17.478 38.583 39.010v6.475c0 21.577-17.245 39.056-38.583 39.056h-64.288c-21.285 0-38.606-17.479-38.606-39.056v-6.475c0-21.523 17.321-39.010 38.606-39.010v0zM169.744 661.37h64.288c21.338 0 38.583 17.478 38.583 39.065v6.464c0 21.588-17.245 39.063-38.583 39.063h-64.288c-21.285 0-38.606-17.478-38.606-39.063v-6.464c0-21.594 17.321-39.065 38.606-39.065v0z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-sousuo" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M940.288 833.472 715.52 608.704c87.808-136.96 72-321.6-47.616-441.216-137.984-137.984-362.432-137.984-500.416 0s-137.984 362.432 0 500.416c119.616 119.616 304.32 135.488 441.216 47.616l224.832 224.832c26.24 26.24 68.736 26.24 94.912 0l11.904-11.904C966.592 902.272 966.592 859.776 940.288 833.472zM244.608 590.72c-95.424-95.424-95.424-250.688 0-346.176 95.36-95.424 250.688-95.424 346.112 0 95.36 95.424 95.36 250.688 0 346.048C495.36 686.144 340.032 686.144 244.608 590.72z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-right" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M948.225711 318.895981c18.201547-18.198477 27.807323-40.697911 28.814256-67.496254 1.013073-26.787086-7.582699-49.28652-25.784246-67.480904-18.197454-18.200524-40.443108-27.049053-66.728774-26.541493-26.288736 0.503467-48.536436 9.859555-66.739007 28.052916L390.098137 613.127212l-147.120732-145.603169c-18.191314-18.192338-40.437991-27.548426-66.734914-28.057009-26.287713-0.50449-48.535413 8.347109-66.724681 26.541493-18.199501 18.198477-27.555589 39.683814-28.059056 64.459081-0.505513 24.771173 8.335852 46.264697 26.539446 64.460104l210.81131 212.325803c18.204617 18.205641 41.964764 27.052123 71.284533 26.542516 29.323862-0.496304 53.090149-9.853415 71.281463-28.045753l486.844064-486.844064L948.225711 318.895981z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-i" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M511.949858 116.479875c-215.950354 0-391.595746 175.646416-391.595746 391.595746 0 215.919654 175.645392 391.595746 391.595746 391.595746 215.919654 0 391.595746-175.677115 391.595746-391.595746C903.545604 292.125267 727.868489 116.479875 511.949858 116.479875zM511.949858 228.364081c30.897707 0 55.942103 25.045419 55.942103 55.942103 0 30.893614-25.045419 55.942103-55.942103 55.942103-30.897707 0-55.942103-25.048489-55.942103-55.942103C456.007755 253.4095 481.052151 228.364081 511.949858 228.364081zM623.834065 731.845057 400.064628 731.845057l0-55.942103 55.942103 0L456.006731 452.133517l-55.942103 0 0-55.942103 55.942103 0 111.884207 0 0 55.942103 0 223.769436 55.942103 0L623.833041 731.845057z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-danxuankuang" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M512 995.555556C779.060361 995.555556 995.555556 779.060361 995.555556 512 995.555556 244.939641 779.060361 28.444444 512 28.444444 244.939639 28.444444 28.444444 244.939641 28.444444 512 28.444444 779.060361 244.939639 995.555556 512 995.555556L512 995.555556ZM512 938.666667C276.358508 938.666667 85.333333 747.641492 85.333333 512 85.333333 276.358507 276.358508 85.333333 512 85.333333 747.641492 85.333333 938.666667 276.358507 938.666667 512 938.666667 747.641492 747.641492 938.666667 512 938.666667L512 938.666667Z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-jiahao" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M855.743902 645.950781 651.599432 645.950781l0 204.14447c0 37.575804-30.458709 68.041676-68.041676 68.041676L447.461101 918.136927c-37.582967 0-68.054979-30.464849-68.054979-68.041676L379.406123 645.950781 175.260629 645.950781c-37.582967 0-68.041676-30.464849-68.041676-68.047816L107.218954 441.806311c0-37.582967 30.458709-68.047816 68.041676-68.047816l204.14447 0L379.405099 169.605839c0-37.575804 30.472012-68.041676 68.054979-68.041676l136.096654 0c37.582967 0 68.041676 30.464849 68.041676 68.041676l0 204.151633L855.743902 373.757472c37.582967 0 68.054979 30.464849 68.054979 68.047816l0 136.096654C923.79888 615.485933 893.326868 645.950781 855.743902 645.950781z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-phone" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M947.2 748.8c-25.6-32-89.6-76.8-108.8-89.6-19.2-12.8-102.4-76.8-147.2-70.4-44.8 6.4-64 96-76.8 102.4 0 0-70.4-32-153.6-102.4S326.4 416 326.4 409.6C326.4 403.2 371.2 390.4 384 384c64-38.4 57.6-51.2 32-115.2C384 204.8 320 121.6 294.4 102.4 281.6 83.2 262.4 64 236.8 64 204.8 64 166.4 102.4 147.2 121.6 64 224 51.2 288 76.8 371.2c19.2 64 83.2 160 192 294.4 102.4 121.6 268.8 236.8 345.6 268.8 83.2 38.4 128 32 160 19.2 32-6.4 121.6-57.6 153.6-108.8C966.4 800 966.4 787.2 947.2 748.8zM889.6 812.8c-25.6 38.4-108.8 83.2-128 89.6-12.8 6.4-25.6 6.4-38.4 6.4-25.6 0-51.2-6.4-89.6-25.6-64-32-230.4-140.8-326.4-256C172.8 473.6 134.4 390.4 121.6 358.4c-19.2-64-12.8-108.8 64-204.8 12.8-19.2 38.4-38.4 51.2-38.4 6.4 0 12.8 6.4 25.6 19.2 19.2 19.2 83.2 96 108.8 153.6C371.2 300.8 377.6 313.6 384 320c-6.4 0-12.8 6.4-25.6 19.2 0 0-12.8 6.4-19.2 6.4-25.6 12.8-64 25.6-57.6 64 0 12.8 0 19.2 12.8 44.8C300.8 467.2 307.2 480 320 505.6c19.2 32 57.6 83.2 102.4 128 64 57.6 153.6 121.6 185.6 121.6 12.8 0 19.2-6.4 32-6.4 12.8-12.8 38.4-70.4 44.8-83.2 6.4-6.4 6.4-12.8 12.8-12.8 6.4 0 19.2 0 51.2 19.2 25.6 12.8 64 38.4 64 38.4 44.8 32 83.2 57.6 89.6 76.8 6.4 6.4 6.4 6.4 6.4 12.8C908.8 793.6 902.4 800 889.6 812.8z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-loading" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M832.931337 512m-58.014298 0a56.693 56.693 0 1 0 116.028597 0 56.693 56.693 0 1 0-116.028597 0Z"  ></path>' +
    '' +
    '<path d="M191.110619 512m-76.094072 0a74.361 74.361 0 1 0 152.188144 0 74.361 74.361 0 1 0-152.188144 0Z"  ></path>' +
    '' +
    '<path d="M512.021489 832.91087m-58.014298 0a56.693 56.693 0 1 0 116.028597 0 56.693 56.693 0 1 0-116.028597 0Z"  ></path>' +
    '' +
    '<path d="M512.021489 191.090153m-99.43978 0a97.175 97.175 0 1 0 198.87956 0 97.175 97.175 0 1 0-198.87956 0Z"  ></path>' +
    '' +
    '<path d="M738.939639 738.918149m-58.014298 0a56.693 56.693 0 1 0 116.028597 0 56.693 56.693 0 1 0-116.028597 0Z"  ></path>' +
    '' +
    '<path d="M285.10334 285.081851m-87.078241 0a85.095 85.095 0 1 0 174.156482 0 85.095 85.095 0 1 0-174.156482 0Z"  ></path>' +
    '' +
    '<path d="M285.10334 738.918149m-58.014298 0a56.693 56.693 0 1 0 116.028597 0 56.693 56.693 0 1 0-116.028597 0Z"  ></path>' +
    '' +
    '<path d="M738.939639 285.082874m-58.014298 0a56.693 56.693 0 1 0 116.028597 0 56.693 56.693 0 1 0-116.028597 0Z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-iconfontchexiao" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M892.541481 355.306238 579.153958 646.307915l0-179.078585c-92.009554 0-313.387523-13.727653-313.387523 223.848231 0 124.428917 82.522482 244.61623 201.463408 268.6189C276.10592 934.119947 131.457496 774.671445 131.457496 579.153446c0-363.184673 384.323109-358.157169 447.696462-358.157169L579.153958 64.303538 892.541481 355.306238z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-chilun" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M841.638649 555.271526c1.775436-14.201443 3.106758-28.625968 3.106758-43.271526 0-14.645558-1.331321-29.069059-3.106758-43.271526l93.865831-73.449849c8.432043-6.656607 10.873652-18.639522 5.325285-28.40391l-88.76158-153.779386c-5.547343-9.54233-17.087167-13.536294-27.072589-9.54233l-110.508883 44.602847c-22.856567-17.530258-47.931662-32.397874-75.003228-43.715641L622.841457 86.830601c-1.997494-10.429537-11.095709-18.639522-22.190395-18.639522l-177.523159 0c-11.095709 0-20.192901 8.209986-21.968337 18.639522l-16.643052 117.609605c-27.072589 11.316743-52.147684 25.962302-75.003228 43.715641l-110.50786-44.602847c-9.985422-3.771907-21.524223 0-27.072589 9.54233l-88.76158 153.779386c-5.547343 9.54233-3.106758 21.524223 5.325285 28.40391l93.643774 73.449849c-1.775436 14.201443-3.106758 28.625968-3.106758 43.271526 0 14.645558 1.331321 29.069059 3.106758 43.271526l-93.643774 73.449849c-8.432043 6.656607-10.873652 18.639522-5.325285 28.40391l88.76158 153.779386c5.547343 9.54233 17.086144 13.536294 27.072589 9.54233l110.508883-44.602847c22.856567 17.530258 47.931662 32.397874 75.003228 43.715641l16.643052 117.609605c1.775436 10.429537 10.873652 18.639522 21.968337 18.639522l177.523159 0c11.095709 0 20.192901-8.209986 21.968337-18.639522l16.643052-117.609605c27.072589-11.316743 52.147684-25.962302 75.003228-43.715641l110.50786 44.602847c9.985422 3.771907 21.525246 0 27.072589-9.54233l88.76158-153.779386c5.547343-9.54233 3.106758-21.524223-5.325285-28.40391L841.638649 555.271526zM511.88846 667.332764c-85.876879 0-155.332764-69.455885-155.332764-155.332764s69.455885-155.332764 155.332764-155.332764c85.876879 0 155.332764 69.455885 155.332764 155.332764S597.765339 667.332764 511.88846 667.332764z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-menudown" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M170.666667 255.402667l341.162667 291.328 341.162667-291.328 0 221.269333L511.829333 768 170.666667 476.672 170.666667 255.402667z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-menuup" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M170.666667 546.730667l341.162667-291.328 341.162667 291.328L852.992 768 511.829333 476.672 170.666667 768 170.666667 546.730667z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-menuleft" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M546.901333 852.821333 255.573333 511.658667l291.328-341.162667 221.269333 0L476.757333 511.658667l291.328 341.162667L546.901333 852.821333z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-menuright" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M476.757333 170.496l291.413333 341.162667L476.757333 852.821333 255.488 852.821333l291.413333-341.162667L255.573333 170.496 476.757333 170.496z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-tuichu" viewBox="0 0 1027 1024">' +
    '' +
    '<path d="M584.470443 677.918c-3.66 0-6.515 0-9.36 0-97.805 0-195.607 0.01-293.414 0-14.5-0.005-23.95-6.65-26.28-18.54-0.458-2.375-0.415-4.87-0.415-7.3-0.018-86.915-0.02-173.825-0.012-260.739 0.003-16.485 8.93-25.255 25.672-25.255 98.247-0.005 196.497-0.005 294.749-0.005 2.645 0 5.31 0 9.06 0 0-2.82 0-5.362 0-7.912 0-77.352-0.01-154.71 0.01-232.069 0-10.645 5.075-19.135 13.67-22.387 9.89-3.745 18.665-2.02 26.12 5.857 4.275 4.517 8.93 8.672 13.32 13.065 55.385 55.265 110.76 110.555 166.13 165.82 71.12 70.965 142.245 141.912 213.365 212.874 11.84 11.802 11.905 24.252 0.205 35.927-101.78 101.605-203.549 203.219-305.359 304.784-28.955 28.885-58.065 57.595-86.995 86.505-7.445 7.45-15.75 10.715-25.915 6.855-9.885-3.75-14.54-11.53-14.54-23.765-0.015-74.905-0.01-149.82-0.01-224.724C584.470443 684.263 584.470443 681.623 584.470443 677.918zM401.643443 106.172c0 29.415 0 58.215 0 87.827-2.882 0-5.477 0-8.07 0-74.465 0-148.93-0.01-223.394 0.005-47.187 0.007-81.935 34.827-81.937 82.107-0.007 163.602 0.293 327.202-0.197 490.791-0.135 43.285 32.795 74.47 63.24 80.165 6.727 1.245 13.677 1.81 20.525 1.825 73.797 0.13 147.597 0.08 221.397 0.08 2.622 0 5.247 0 8.302 0 0 29.325 0 58.115 0 87.325-1.05 0.21-2.275 0.68-3.503 0.68-78.467 0-156.942 0.8-235.389-0.34-76.67-1.1-144.565-59.285-159.197-134.595-2.065-10.61-3.075-21.595-3.087-32.405-0.19-165.385-0.627-330.762 0.102-496.134 0.305-69.077 34.625-118.665 94.56-150.892 21.145-11.375 44.502-16.512 68.577-16.572 77.797-0.21 155.595-0.08 233.394-0.075C398.281443 105.965 399.593443 106.08 401.643443 106.172z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-sortdown" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M1004.991894 242.99344c-12.658061-12.668568-27.662802-18.997599-45.000212-18.997599L64.004816 223.995841c-17.344415 0-32.338649 6.32903-45.007217 18.997599C6.32903 255.676018 0 270.670251 0 288.004159c0 17.330405 6.32903 32.324639 18.997599 44.99671l447.995184 447.995184c12.682578 12.668568 27.676812 19.011609 45.007217 19.011609s32.338649-6.34304 44.99671-19.011609L1004.991894 332.997366c12.654558-12.668568 19.008106-27.662802 19.008106-44.99671C1024 270.670251 1017.646452 255.676018 1004.991894 242.99344z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-sortup" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M1004.991894 690.995629 556.99671 243.000445c-12.654558-12.668568-27.652294-18.997599-44.99671-18.997599s-32.338649 6.32903-45.007217 18.997599L18.997599 690.995629C6.32903 703.65369 0 718.65843 0 735.988836s6.32903 32.338649 18.997599 44.99671c12.682578 12.668568 27.676812 19.011609 45.007217 19.011609l895.986866 0c17.333908 0 32.338649-6.34304 45.000212-19.011609 12.654558-12.654558 19.008106-27.662802 19.008106-44.99671S1017.646452 703.65369 1004.991894 690.995629z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-qiepian30" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M941.728 137.152C941.728 122.304 932.576 109.152 919.456 103.424 905.728 97.728 889.728 100.576 879.456 111.424L805.152 185.152C724.576 109.152 615.456 64 502.88 64 261.152 64 64 261.152 64 502.88 64 744.576 261.152 941.728 502.88 941.728 633.728 941.728 757.152 884 840.576 783.424 846.304 776 846.304 765.152 839.456 758.88L761.152 680C757.152 676.576 752 674.88 746.88 674.88 741.728 675.424 736.576 677.728 733.728 681.728 677.728 754.304 593.728 795.424 502.88 795.424 341.728 795.424 210.304 664 210.304 502.88 210.304 341.728 341.728 210.304 502.88 210.304 577.728 210.304 648.576 238.88 702.304 288.576L623.456 367.424C612.576 377.728 609.728 393.728 615.456 406.88 621.152 420.576 634.304 429.728 649.152 429.728L905.152 429.728C925.152 429.728 941.728 413.152 941.728 393.152L941.728 137.152Z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-radio-selected-copy" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M513.44 3.168c-279.808 0-507.424 227.616-507.424 507.424s227.616 507.36 507.424 507.36c279.776 0 507.36-227.584 507.36-507.36s-227.584-507.424-507.36-507.424zM513.44 964.064c-250.08 0-453.536-203.424-453.536-453.472s203.456-453.536 453.536-453.536c250.048 0 453.472 203.456 453.472 453.536s-203.424 453.472-453.472 453.472zM728.128 511.584c0 118.56-96.128 214.688-214.688 214.688s-214.688-96.128-214.688-214.688c0-118.56 96.128-214.688 214.688-214.688s214.688 96.128 214.688 214.688z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-rili" viewBox="0 0 1638 1024">' +
    '' +
    '<path d="M1152.656 825.408c0 29.71-24.467 53.594-53.594 53.594h-593.028c-29.71 0-53.594-24.467-53.594-53.594v-538.269c0-29.71 24.467-53.594 53.594-53.594h53.594v-40.195c0-37.283 30.292-67.574 67.574-67.574h26.797c37.283 0 67.574 30.292 67.574 67.574v40.195h161.364v-40.195c0-37.283 30.292-67.574 67.574-67.574h26.797c37.283 0 67.574 30.292 67.574 67.574v40.195h53.594c29.71 0 53.594 24.467 53.594 53.594v538.269h0.582zM627.785 516.078v-121.169h-121.751v121.169h121.751zM627.785 677.442v-134.567h-121.751v134.567h121.751zM627.785 825.408v-121.169h-121.751v121.169h121.751zM667.98 192.767c0-6.991-6.407-13.398-13.398-13.398h-26.797c-6.991 0-13.398 6.407-13.398 13.398v121.169c0 6.991 6.407 13.398 13.398 13.398h26.797c6.991 0 13.398-6.407 13.398-13.398v-121.169zM789.149 516.078v-121.169h-134.567v121.169h134.567zM789.149 677.442v-134.567h-134.567v134.567h134.567zM789.149 825.408v-121.169h-134.567v121.169h134.567zM950.514 516.078v-121.169h-134.567v121.169h134.567zM950.514 677.442v-134.567h-134.567v134.567h134.567zM950.514 825.408v-121.169h-134.567v121.169h134.567zM991.291 192.767c0-6.991-6.407-13.398-13.398-13.398h-26.797c-6.991 0-13.398 6.407-13.398 13.398v121.169c0 6.991 6.407 13.398 13.398 13.398h26.797c6.991 0 13.398-6.407 13.398-13.398v-121.169zM1099.062 516.078v-121.169h-121.169v121.169h121.169zM1099.062 677.442v-134.567h-121.169v134.567h121.169zM1099.062 825.408v-121.169h-121.169v121.169h121.169z" fill="" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)