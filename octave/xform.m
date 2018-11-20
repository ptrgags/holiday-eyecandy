function w = xform(T, z)
  w = (T(1, 1) * z + T(1, 2)) / (T(2, 1) * z + T(2, 2));
end