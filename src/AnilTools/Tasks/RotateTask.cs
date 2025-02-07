﻿
using OpenTK.Mathematics;
using System;
using ZargoEngine.Mathmatics;

namespace ZargoEngine.AnilTools
{
    public class RotateTask : TransformTask
    {
        private readonly Quaternion _targetRotation;

        public override bool IsFinished()
        {
            if (from.rotation.Angle(_targetRotation) < 1){
                from.rotation = _targetRotation;
                return true;
            }
            return false;
        }

        public override bool Proceed()
        {
            if (moveType == MoveType.lerp)        Quaternion.Slerp(from.rotation, _targetRotation, Time.DeltaTime * speed);
            if (moveType == MoveType.MoveTowards) _targetRotation.RotateTowards(_targetRotation, Time.DeltaTime * speed);
            if (moveType == MoveType.curve) { } // comining
            return base.Proceed();
        }

        public RotateTask(Transform from, Quaternion targetRotation, TransformationFlags transformationFlags, float speed,
                          UpdateType updateType, MoveType moveType, AnimationCurve animationCurve, 
                          Action endAction) : base(from, transformationFlags, speed, updateType, moveType, animationCurve, endAction)
        {
            currentTask = this;
            this._targetRotation = targetRotation;
        }
    }
}
