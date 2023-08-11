import Svg, { Path } from "react-native-svg";
import React from "react";

const Logo = ({ width, height }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 86 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M6.3054 3.70616C6.32545 3.63665 6.38225 3.59242 6.47581 3.57346C7.01714 3.45972 7.57182 3.34281 8.13988 3.22275C8.70793 3.10269 9.25259 2.95419 9.77387 2.77725C9.86743 2.77725 9.91421 2.80885 9.91421 2.87204L10.9367 9.33649L12.8514 2.87204C12.8781 2.80885 12.9282 2.77725 13.0017 2.77725C13.0218 2.77725 13.0352 2.78041 13.0418 2.78673C13.0485 2.78673 13.0619 2.78673 13.0819 2.78673C13.5832 2.96998 14.0978 3.12164 14.6257 3.24171C15.1537 3.35545 15.6783 3.46603 16.1996 3.57346C16.3265 3.59874 16.39 3.66825 16.39 3.78199C16.39 3.86414 16.3499 3.99052 16.2697 4.16114L13.0418 12.6161C12.9884 12.7235 12.9416 12.8152 12.9015 12.891C12.8614 12.9605 12.8213 13.0174 12.7812 13.0616C12.7411 13.0995 12.6977 13.1311 12.6509 13.1564C12.6041 13.1754 12.5473 13.1912 12.4805 13.2038C11.9726 13.3049 11.458 13.4155 10.9367 13.5355C10.4154 13.6556 9.87411 13.8073 9.31274 13.9905C9.29938 13.9905 9.28935 13.9905 9.28267 13.9905C9.27598 13.9968 9.2693 14 9.26262 14H9.19245C9.15903 14 9.1323 13.9874 9.11225 13.9621C9.0922 13.9431 9.07884 13.9242 9.07215 13.9052C8.99864 13.6335 8.9151 13.2954 8.82154 12.891C8.72798 12.4866 8.62774 12.0379 8.52081 11.545C8.41388 11.0521 8.30027 10.5245 8.17998 9.96208C8.05968 9.39968 7.93605 8.82148 7.80907 8.22749L6.53596 12.4645C6.50255 12.5782 6.46579 12.673 6.42569 12.7488C6.39228 12.8183 6.35218 12.8752 6.3054 12.9194C6.25862 12.9573 6.20849 12.9858 6.15503 13.0047C6.10157 13.0237 6.04142 13.0395 5.97459 13.0521C5.46668 13.1469 4.95209 13.2543 4.43082 13.3744C3.90955 13.5008 3.36823 13.6556 2.80685 13.8389C2.79349 13.8389 2.78346 13.8389 2.77678 13.8389C2.7701 13.8452 2.76341 13.8483 2.75673 13.8483H2.68656C2.65315 13.8483 2.62307 13.8357 2.59634 13.8104C2.57629 13.7915 2.56627 13.7725 2.56627 13.7536C2.4727 13.4755 2.36578 13.1248 2.24548 12.7014C2.12519 12.2717 1.99487 11.7946 1.85453 11.2701C1.72087 10.7393 1.58053 10.1738 1.4335 9.57346C1.28647 8.97314 1.13611 8.36335 0.982399 7.74408C0.82869 7.1248 0.674982 6.51185 0.521273 5.90521C0.374247 5.29226 0.230563 4.7109 0.0902203 4.16114C0.0434394 4.06003 0.0167075 3.97788 0.0100245 3.91469C0.00334149 3.84518 0 3.78831 0 3.74408C0 3.65561 0.0534639 3.59874 0.160392 3.57346C0.681665 3.46603 1.22299 3.35545 1.78436 3.24171C2.34573 3.12164 2.87703 2.96998 3.37825 2.78673C3.3983 2.78041 3.42837 2.77725 3.46847 2.77725C3.55535 2.77725 3.60213 2.80885 3.60881 2.87204L4.73155 9.43128L6.3054 3.70616Z"
        fill="white"
      />
      <Path
        d="M22.8458 2.77725C23.4807 2.77725 24.0554 2.891 24.57 3.11848C25.0913 3.33965 25.5357 3.63033 25.9033 3.99052C26.2775 4.34439 26.5649 4.7425 26.7654 5.18483C26.9658 5.62717 27.0661 6.06951 27.0661 6.51185C27.0661 6.90363 26.9391 7.29858 26.6852 7.69668C26.4312 8.08847 26.0737 8.44234 25.6125 8.75829C25.1581 9.07425 24.6101 9.33017 23.9685 9.52607C23.327 9.72196 22.6219 9.81991 21.8534 9.81991C21.4524 9.81991 21.0314 9.78199 20.5903 9.70616C20.617 9.97788 20.7006 10.2117 20.8409 10.4076C20.9812 10.6035 21.1583 10.7646 21.3722 10.891C21.586 11.0174 21.8266 11.1122 22.094 11.1754C22.368 11.2322 22.6486 11.2607 22.936 11.2607C23.2568 11.2607 23.5642 11.2354 23.8583 11.1848C24.159 11.128 24.4464 11.0553 24.7204 10.9668C24.9944 10.8784 25.2583 10.7804 25.5123 10.673C25.7663 10.5656 26.0068 10.4581 26.2341 10.3507C26.2942 10.3381 26.3443 10.3286 26.3844 10.3223C26.4312 10.3096 26.4746 10.3033 26.5147 10.3033C26.5147 10.3033 26.5114 10.3539 26.5047 10.455C26.5047 10.5561 26.5047 10.6983 26.5047 10.8815C26.5047 11.0648 26.5014 11.2859 26.4947 11.545C26.4947 11.8041 26.4914 12.0916 26.4847 12.4076C26.5047 12.4392 26.5181 12.4708 26.5248 12.5024C26.5315 12.534 26.5348 12.5592 26.5348 12.5782C26.5348 12.654 26.4613 12.7362 26.3143 12.8246C26.1672 12.9131 25.9734 13.0047 25.7328 13.0995C25.4989 13.1943 25.2283 13.2859 24.9209 13.3744C24.6201 13.4629 24.3127 13.5419 23.9986 13.6114C23.6845 13.6872 23.3804 13.7441 23.0864 13.782C22.7923 13.8262 22.535 13.8483 22.3145 13.8483C21.5927 13.8483 20.891 13.7283 20.2094 13.4882C19.5344 13.2543 18.9329 12.9163 18.4049 12.4739C17.8837 12.0316 17.466 11.4945 17.1519 10.8626C16.8378 10.2306 16.6807 9.51975 16.6807 8.72986C16.6807 7.90205 16.8311 7.12796 17.1318 6.40758C17.4326 5.68088 17.8536 5.04897 18.3949 4.51185C18.9429 3.97472 19.5945 3.55134 20.3497 3.24171C21.1049 2.93207 21.9369 2.77725 22.8458 2.77725ZM22.7255 5.29858C22.4515 5.29858 22.1975 5.35545 21.9636 5.46919C21.7364 5.57662 21.5259 5.7346 21.3321 5.94313C21.145 6.14534 20.9812 6.39179 20.8409 6.68246C20.7006 6.96682 20.5869 7.28278 20.5001 7.63033C21.1884 7.51659 21.7598 7.39652 22.2142 7.27014C22.6687 7.14376 23.0329 7.01738 23.3069 6.891C23.5809 6.75829 23.7747 6.62875 23.8883 6.50237C24.0019 6.36967 24.0588 6.24329 24.0588 6.12322C24.0588 6.00948 24.012 5.90205 23.9184 5.80095C23.8315 5.69984 23.7213 5.61137 23.5876 5.53554C23.4539 5.45972 23.3069 5.40284 23.1465 5.36493C22.9928 5.32069 22.8525 5.29858 22.7255 5.29858Z"
        fill="white"
      />
      <Path
        d="M28.9106 6.46445C28.924 6.16746 28.934 5.93365 28.9407 5.76303C28.9474 5.5861 28.9507 5.45024 28.9507 5.35545C28.9574 5.26066 28.9607 5.19431 28.9607 5.1564C28.9607 5.11848 28.9607 5.08373 28.9607 5.05213C28.9607 5.01422 28.9607 4.96998 28.9607 4.91943C28.9674 4.86888 28.9741 4.78673 28.9808 4.67299C28.9875 4.55292 28.9975 4.39179 29.0108 4.18957C29.0242 3.98104 29.0409 3.70616 29.061 3.36493C29.0743 3.1564 29.0944 3.01422 29.1211 2.93839C29.1545 2.85624 29.2314 2.80569 29.3517 2.78673C29.9398 2.78673 30.5546 2.78673 31.1962 2.78673C31.8377 2.78041 32.4426 2.77409 33.0106 2.76777C33.0708 2.76777 33.1209 2.78357 33.161 2.81517C33.2011 2.84676 33.2211 2.90679 33.2211 2.99526L32.9404 5.97156C32.9137 6.18009 32.887 6.32543 32.8602 6.40758C32.8402 6.48341 32.7667 6.52765 32.6397 6.54028C32.0717 6.5466 31.4869 6.55292 30.8854 6.55924C30.2906 6.56556 29.6691 6.56872 29.0209 6.56872C28.9808 6.56872 28.9507 6.56556 28.9306 6.55924C28.9173 6.55292 28.9106 6.53397 28.9106 6.50237V6.46445ZM28.7101 13.7156C28.7235 13.4186 28.7335 13.1848 28.7402 13.0142C28.7469 12.8373 28.7502 12.7014 28.7502 12.6066C28.7569 12.5118 28.7602 12.4455 28.7602 12.4076C28.7602 12.3697 28.7602 12.3349 28.7602 12.3033C28.7602 12.2654 28.7602 12.2212 28.7602 12.1706C28.7669 12.1201 28.7736 12.0379 28.7803 11.9242C28.787 11.8041 28.797 11.643 28.8104 11.4408C28.8237 11.2322 28.8404 10.9573 28.8605 10.6161C28.8738 10.4076 28.8939 10.2654 28.9206 10.1896C28.954 10.1074 29.0309 10.0569 29.1512 10.0379C29.7393 10.0379 30.3541 10.0379 30.9957 10.0379C31.6373 10.0316 32.2421 10.0253 32.8101 10.019C32.8703 10.019 32.9204 10.0348 32.9605 10.0663C33.0006 10.0979 33.0206 10.158 33.0206 10.2464L32.7399 13.2227C32.7132 13.4313 32.6865 13.5735 32.6598 13.6493C32.6397 13.7314 32.5662 13.7788 32.4392 13.7915C31.8712 13.7978 31.2864 13.8041 30.6849 13.8104C30.0901 13.8167 29.4686 13.8199 28.8204 13.8199C28.7803 13.8199 28.7502 13.8167 28.7302 13.8104C28.7168 13.8041 28.7101 13.7851 28.7101 13.7536V13.7156Z"
        fill="white"
      />
      <Path
        d="M49.6011 13.6967C49.5276 13.7156 49.4307 13.7441 49.3104 13.782C49.1901 13.8262 49.0732 13.8483 48.9596 13.8483C48.866 13.8483 48.7825 13.8262 48.7089 13.782C48.6421 13.7378 48.6087 13.6619 48.6087 13.5545V13.4976C48.6555 13.0363 48.6956 12.6635 48.729 12.3791C48.7624 12.0885 48.7891 11.8547 48.8092 11.6777C48.8292 11.5008 48.8459 11.3681 48.8593 11.2796C48.8727 11.1848 48.886 11.0995 48.8994 11.0237C48.9128 10.9415 48.9228 10.8531 48.9295 10.7583C48.9428 10.6635 48.9596 10.5308 48.9796 10.3602C48.9997 10.1833 49.023 9.95261 49.0498 9.66825C49.0832 9.37757 49.1233 8.99842 49.1701 8.53081C49.1968 8.27804 49.2235 8.02844 49.2503 7.78199C49.2837 7.52923 49.3004 7.29858 49.3004 7.09005C49.3004 6.82464 49.2837 6.58452 49.2503 6.36967C49.2235 6.1485 49.1701 5.96209 49.0899 5.81043C49.0164 5.65245 48.9128 5.52923 48.7791 5.44076C48.6455 5.35229 48.475 5.30806 48.2679 5.30806C48.1409 5.30806 47.9738 5.33333 47.7666 5.38389C47.5662 5.43444 47.3623 5.52607 47.1552 5.65877C46.948 5.78515 46.7609 5.95577 46.5938 6.17062C46.4267 6.37915 46.3198 6.64455 46.273 6.96682V7.00474C46.1928 7.72512 46.1193 8.35071 46.0525 8.88152C45.9923 9.406 45.9388 9.85782 45.8921 10.237C45.8453 10.6161 45.8052 10.9321 45.7718 11.1848C45.745 11.4376 45.7216 11.6524 45.7016 11.8294C45.6816 12 45.6648 12.1422 45.6515 12.2559C45.6448 12.3697 45.6415 12.4771 45.6415 12.5782C45.6415 12.6288 45.6415 12.673 45.6415 12.7109C45.6481 12.7425 45.6515 12.7709 45.6515 12.7962C45.6515 12.8468 45.6247 12.891 45.5713 12.9289C45.5245 12.9605 45.4142 13.0016 45.2405 13.0521L42.8847 13.6967C42.8112 13.7156 42.7143 13.7441 42.594 13.782C42.4737 13.8262 42.3568 13.8483 42.2432 13.8483C42.1496 13.8483 42.0661 13.8262 41.9925 13.782C41.9257 13.7378 41.8923 13.6619 41.8923 13.5545V13.4976C41.9391 13.0363 41.9758 12.6635 42.0026 12.3791C42.036 12.0885 42.0627 11.8547 42.0828 11.6777C42.1095 11.5008 42.1295 11.3681 42.1429 11.2796C42.1563 11.1848 42.1663 11.0995 42.173 11.0237C42.1864 10.9415 42.1997 10.8531 42.2131 10.7583C42.2264 10.6635 42.2398 10.5308 42.2532 10.3602C42.2732 10.1833 42.2966 9.95261 42.3234 9.66825C42.3568 9.37757 42.3969 8.99842 42.4436 8.53081C42.4704 8.27804 42.4971 8.02844 42.5238 7.78199C42.5573 7.52923 42.574 7.29858 42.574 7.09005C42.574 6.82464 42.5606 6.58452 42.5339 6.36967C42.5071 6.1485 42.457 5.96209 42.3835 5.81043C42.3167 5.65245 42.2231 5.52923 42.1028 5.44076C41.9825 5.35229 41.8288 5.30806 41.6417 5.30806C41.508 5.30806 41.3242 5.33965 41.0903 5.40284C40.8631 5.46603 40.6326 5.5703 40.3987 5.71564C40.1714 5.86098 39.9676 6.05371 39.7872 6.29384C39.6134 6.52765 39.5132 6.81833 39.4864 7.16588C39.433 7.63349 39.3895 8.01896 39.3561 8.32227C39.3227 8.61927 39.296 8.86572 39.2759 9.06161C39.2559 9.25118 39.2392 9.406 39.2258 9.52607C39.2191 9.63981 39.2124 9.74724 39.2057 9.84834C39.1991 9.87362 39.189 9.94629 39.1757 10.0663C39.1623 10.1801 39.1456 10.3191 39.1255 10.4834C39.1122 10.6414 39.0955 10.8152 39.0754 11.0047C39.0621 11.188 39.0487 11.3618 39.0353 11.5261C39.022 11.684 39.0086 11.8231 38.9952 11.9431C38.9885 12.0569 38.9852 12.1264 38.9852 12.1517V12.3223C38.9852 12.3855 38.9819 12.4392 38.9752 12.4834C38.9685 12.5276 38.9484 12.5687 38.915 12.6066C38.8816 12.6445 38.8315 12.6793 38.7647 12.7109C38.7045 12.7425 38.6176 12.7773 38.504 12.8152L35.8776 13.6967C35.8041 13.722 35.7072 13.7536 35.5869 13.7915C35.4666 13.8294 35.3497 13.8483 35.236 13.8483C35.1425 13.8483 35.0589 13.8262 34.9854 13.782C34.9186 13.7378 34.8852 13.6619 34.8852 13.5545L35.7874 3.88626C35.8074 3.67773 35.8308 3.53554 35.8576 3.45972C35.891 3.37757 35.9678 3.32385 36.0881 3.29858C36.6963 3.18483 37.3178 3.07109 37.9527 2.95735C38.5876 2.83728 39.2091 2.68562 39.8172 2.50237C39.8707 2.50237 39.9008 2.51185 39.9075 2.53081C39.9208 2.54344 39.9275 2.56556 39.9275 2.59716L39.7972 3.98104C40.0445 3.86098 40.3218 3.73144 40.6292 3.59242C40.9366 3.44708 41.2574 3.31438 41.5916 3.19431C41.9324 3.07425 42.2766 2.9763 42.6241 2.90047C42.9783 2.81833 43.3225 2.77725 43.6566 2.77725C44.1177 2.77725 44.5421 2.87836 44.9297 3.08057C45.324 3.27646 45.6481 3.60506 45.9021 4.06635C46.2028 3.8831 46.5203 3.71248 46.8544 3.5545C47.1952 3.39652 47.5394 3.26066 47.8869 3.14692C48.2411 3.03318 48.5953 2.94471 48.9495 2.88152C49.3037 2.81833 49.6479 2.78673 49.9821 2.78673C50.4031 2.78673 50.8007 2.8436 51.175 2.95735C51.5492 3.07109 51.8733 3.2575 52.1473 3.51659C52.428 3.77567 52.6486 4.11374 52.809 4.53081C52.9693 4.94155 53.0495 5.44392 53.0495 6.03791C53.0495 6.18957 53.0462 6.34755 53.0395 6.51185C53.0328 6.66983 53.0195 6.83412 52.9994 7.00474L52.5383 11.0616C52.5049 11.327 52.4848 11.5735 52.4781 11.8009C52.4715 12.0221 52.4681 12.2812 52.4681 12.5782C52.4681 12.6288 52.4681 12.673 52.4681 12.7109C52.4748 12.7425 52.4781 12.7709 52.4781 12.7962C52.4781 12.8531 52.4514 12.8973 52.398 12.9289C52.3512 12.9605 52.2409 13.0016 52.0671 13.0521L49.6011 13.6967Z"
        fill="white"
      />
      <Path
        d="M60.5378 2.77725C61.1727 2.77725 61.7475 2.891 62.262 3.11848C62.7833 3.33965 63.2277 3.63033 63.5953 3.99052C63.9695 4.34439 64.2569 4.7425 64.4574 5.18483C64.6579 5.62717 64.7581 6.06951 64.7581 6.51185C64.7581 6.90363 64.6312 7.29858 64.3772 7.69668C64.1233 8.08847 63.7657 8.44234 63.3046 8.75829C62.8501 9.07425 62.3021 9.33017 61.6606 9.52607C61.019 9.72196 60.3139 9.81991 59.5454 9.81991C59.1444 9.81991 58.7234 9.78199 58.2823 9.70616C58.3091 9.97788 58.3926 10.2117 58.5329 10.4076C58.6733 10.6035 58.8504 10.7646 59.0642 10.891C59.2781 11.0174 59.5187 11.1122 59.786 11.1754C60.06 11.2322 60.3407 11.2607 60.6281 11.2607C60.9488 11.2607 61.2563 11.2354 61.5503 11.1848C61.851 11.128 62.1384 11.0553 62.4124 10.9668C62.6864 10.8784 62.9504 10.7804 63.2043 10.673C63.4583 10.5656 63.6989 10.4581 63.9261 10.3507C63.9863 10.3381 64.0364 10.3286 64.0765 10.3223C64.1233 10.3096 64.1667 10.3033 64.2068 10.3033C64.2068 10.3033 64.2034 10.3539 64.1968 10.455C64.1968 10.5561 64.1968 10.6983 64.1968 10.8815C64.1968 11.0648 64.1934 11.2859 64.1867 11.545C64.1867 11.8041 64.1834 12.0916 64.1767 12.4076C64.1968 12.4392 64.2101 12.4708 64.2168 12.5024C64.2235 12.534 64.2268 12.5592 64.2268 12.5782C64.2268 12.654 64.1533 12.7362 64.0063 12.8246C63.8593 12.9131 63.6655 13.0047 63.4249 13.0995C63.191 13.1943 62.9203 13.2859 62.6129 13.3744C62.3122 13.4629 62.0047 13.5419 61.6906 13.6114C61.3765 13.6872 61.0725 13.7441 60.7784 13.782C60.4844 13.8262 60.2271 13.8483 60.0065 13.8483C59.2848 13.8483 58.5831 13.7283 57.9014 13.4882C57.2264 13.2543 56.6249 12.9163 56.097 12.4739C55.5757 12.0316 55.158 11.4945 54.8439 10.8626C54.5298 10.2306 54.3728 9.51975 54.3728 8.72986C54.3728 7.90205 54.5231 7.12796 54.8239 6.40758C55.1246 5.68088 55.5456 5.04897 56.087 4.51185C56.635 3.97472 57.2866 3.55134 58.0417 3.24171C58.7969 2.93207 59.6289 2.77725 60.5378 2.77725ZM60.4175 5.29858C60.1435 5.29858 59.8896 5.35545 59.6557 5.46919C59.4285 5.57662 59.2179 5.7346 59.0241 5.94313C58.837 6.14534 58.6733 6.39179 58.5329 6.68246C58.3926 6.96682 58.279 7.28278 58.1921 7.63033C58.8805 7.51659 59.4518 7.39652 59.9063 7.27014C60.3607 7.14376 60.725 7.01738 60.999 6.891C61.273 6.75829 61.4668 6.62875 61.5804 6.50237C61.694 6.36967 61.7508 6.24329 61.7508 6.12322C61.7508 6.00948 61.704 5.90205 61.6105 5.80095C61.5236 5.69984 61.4133 5.61137 61.2796 5.53554C61.146 5.45972 60.999 5.40284 60.8386 5.36493C60.6849 5.32069 60.5445 5.29858 60.4175 5.29858Z"
        fill="white"
      />
      <Path
        d="M71.9858 2.77725C72.6207 2.77725 73.1954 2.891 73.71 3.11848C74.2313 3.33965 74.6757 3.63033 75.0432 3.99052C75.4175 4.34439 75.7049 4.7425 75.9053 5.18483C76.1058 5.62717 76.2061 6.06951 76.2061 6.51185C76.2061 6.90363 76.0791 7.29858 75.8252 7.69668C75.5712 8.08847 75.2137 8.44234 74.7525 8.75829C74.2981 9.07425 73.7501 9.33017 73.1085 9.52607C72.467 9.72196 71.7619 9.81991 70.9934 9.81991C70.5924 9.81991 70.1714 9.78199 69.7303 9.70616C69.757 9.97788 69.8405 10.2117 69.9809 10.4076C70.1212 10.6035 70.2983 10.7646 70.5122 10.891C70.726 11.0174 70.9666 11.1122 71.2339 11.1754C71.5079 11.2322 71.7886 11.2607 72.076 11.2607C72.3968 11.2607 72.7042 11.2354 72.9983 11.1848C73.299 11.128 73.5864 11.0553 73.8604 10.9668C74.1344 10.8784 74.3983 10.7804 74.6523 10.673C74.9062 10.5656 75.1468 10.4581 75.3741 10.3507C75.4342 10.3381 75.4843 10.3286 75.5244 10.3223C75.5712 10.3096 75.6146 10.3033 75.6547 10.3033C75.6547 10.3033 75.6514 10.3539 75.6447 10.455C75.6447 10.5561 75.6447 10.6983 75.6447 10.8815C75.6447 11.0648 75.6414 11.2859 75.6347 11.545C75.6347 11.8041 75.6313 12.0916 75.6247 12.4076C75.6447 12.4392 75.6581 12.4708 75.6648 12.5024C75.6714 12.534 75.6748 12.5592 75.6748 12.5782C75.6748 12.654 75.6013 12.7362 75.4542 12.8246C75.3072 12.9131 75.1134 13.0047 74.8728 13.0995C74.6389 13.1943 74.3683 13.2859 74.0608 13.3744C73.7601 13.4629 73.4527 13.5419 73.1386 13.6114C72.8245 13.6872 72.5204 13.7441 72.2264 13.782C71.9323 13.8262 71.675 13.8483 71.4545 13.8483C70.7327 13.8483 70.031 13.7283 69.3493 13.4882C68.6744 13.2543 68.0729 12.9163 67.5449 12.4739C67.0237 12.0316 66.606 11.4945 66.2919 10.8626C65.9778 10.2306 65.8207 9.51975 65.8207 8.72986C65.8207 7.90205 65.9711 7.12796 66.2718 6.40758C66.5726 5.68088 66.9936 5.04897 67.5349 4.51185C68.0829 3.97472 68.7345 3.55134 69.4897 3.24171C70.2449 2.93207 71.0769 2.77725 71.9858 2.77725ZM71.8655 5.29858C71.5915 5.29858 71.3375 5.35545 71.1036 5.46919C70.8764 5.57662 70.6659 5.7346 70.4721 5.94313C70.285 6.14534 70.1212 6.39179 69.9809 6.68246C69.8405 6.96682 69.7269 7.28278 69.6401 7.63033C70.3284 7.51659 70.8998 7.39652 71.3542 7.27014C71.8087 7.14376 72.1729 7.01738 72.4469 6.891C72.7209 6.75829 72.9147 6.62875 73.0283 6.50237C73.1419 6.36967 73.1987 6.24329 73.1987 6.12322C73.1987 6.00948 73.152 5.90205 73.0584 5.80095C72.9715 5.69984 72.8613 5.61137 72.7276 5.53554C72.5939 5.45972 72.4469 5.40284 72.2865 5.36493C72.1328 5.32069 71.9925 5.29858 71.8655 5.29858Z"
        fill="white"
      />
      <Path
        d="M82.8623 6.04739C82.7688 6.7109 82.6786 7.37441 82.5917 8.03791C82.5115 8.6951 82.4614 9.31122 82.4413 9.88626C82.4413 10.1327 82.4614 10.3381 82.5015 10.5024C82.5416 10.6667 82.5984 10.7962 82.6719 10.891C82.7521 10.9858 82.8456 11.0553 82.9526 11.0995C83.0595 11.1374 83.1798 11.1564 83.3134 11.1564C83.5273 11.1564 83.7612 11.128 84.0152 11.0711C84.2691 11.0079 84.5231 10.9289 84.777 10.8341C84.8572 10.8025 84.924 10.7804 84.9775 10.7678C85.0377 10.7488 85.0878 10.7393 85.1279 10.7393C85.1947 10.7393 85.2381 10.7678 85.2582 10.8246C85.2849 10.8815 85.3083 10.9826 85.3284 11.128C85.3551 11.267 85.3919 11.4566 85.4386 11.6967C85.4854 11.9368 85.5623 12.2401 85.6692 12.6066C85.6759 12.6382 85.6792 12.6667 85.6792 12.6919C85.6859 12.7109 85.6892 12.7299 85.6892 12.7488C85.6892 12.8373 85.6525 12.9005 85.579 12.9384C85.5121 12.9763 85.3985 13.0205 85.2381 13.0711C84.9641 13.1596 84.6734 13.2512 84.366 13.346C84.0653 13.4344 83.7645 13.5166 83.4638 13.5924C83.1698 13.6682 82.8857 13.7283 82.6117 13.7725C82.3377 13.8231 82.0971 13.8483 81.89 13.8483C80.7739 13.8483 79.9586 13.5861 79.444 13.0616C78.9361 12.5371 78.6821 11.7378 78.6821 10.6635C78.6821 10.4803 78.6888 10.2938 78.7022 10.1043C78.7155 9.90837 78.7323 9.70616 78.7523 9.49763C78.8191 8.86572 78.8759 8.26856 78.9227 7.70616C78.9762 7.13744 79.0296 6.594 79.0831 6.07583H78.0305C77.6697 6.07583 77.409 6.06319 77.2486 6.03791C77.0882 6.00632 77.008 5.94629 77.008 5.85782C77.008 5.83254 77.0415 5.76619 77.1083 5.65877C77.1751 5.54502 77.2587 5.41232 77.3589 5.26066C77.4658 5.10269 77.5794 4.93523 77.6997 4.75829C77.82 4.58136 77.9336 4.41706 78.0406 4.2654C78.1542 4.10742 78.2511 3.97156 78.3313 3.85782C78.4115 3.74408 78.4616 3.67457 78.4816 3.64929H79.1934C79.2535 3.16904 79.3003 2.76777 79.3337 2.4455C79.3738 2.1169 79.4039 1.84518 79.4239 1.63033C79.4507 1.41548 79.4741 1.25118 79.4941 1.13744C79.5142 1.01738 79.5342 0.92891 79.5543 0.872038C79.581 0.815166 79.6111 0.780411 79.6445 0.767772C79.6846 0.748815 79.7347 0.733017 79.7948 0.720379C80.0956 0.663507 80.3863 0.612954 80.667 0.56872C80.9477 0.518167 81.2283 0.467615 81.509 0.417062C81.7897 0.366509 82.0737 0.309637 82.3611 0.246445C82.6552 0.176935 82.9592 0.0979463 83.2733 0.00947867C83.2934 0.00947867 83.3068 0.00947867 83.3134 0.00947867C83.3201 0.00315956 83.3335 0 83.3535 0C83.4337 0 83.4738 0.0252765 83.4738 0.0758294V0.0947867C83.4404 0.442338 83.387 0.92575 83.3134 1.54502C83.2466 2.1643 83.1698 2.86572 83.0829 3.64929H85.7694C85.8229 3.64929 85.873 3.66825 85.9198 3.70616C85.9733 3.73776 86 3.79463 86 3.87678C86 3.90837 85.9599 4.02212 85.8797 4.21801C85.7995 4.4139 85.6859 4.66983 85.5389 4.98578L85.178 5.75355C85.1312 5.84834 85.0811 5.91785 85.0276 5.96209C84.9809 6.00632 84.8806 6.03475 84.7269 6.04739H82.8623Z"
        fill="white"
      />
    </Svg>
  );
};

export default Logo;
