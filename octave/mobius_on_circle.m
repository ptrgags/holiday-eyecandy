function [z, Q, s] = mobius_on_circle(T, P, r)
  d = T(2, 2);
  c = T(2, 1);
  bottom = conj((d / c) + P);
  top = r * r;
  z = P - top / bottom;
  
  Q = xform(T, z);
  
  s = abs(Q - xform(T, P + r));
end